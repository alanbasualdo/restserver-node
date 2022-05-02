const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usersGet = async (req = request, res = response) => {

    const { desde = 0, hasta = 10 } = req.query
    const q = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(q),
        Usuario.find(q)
            .skip(Number(desde))
            .limit(Number(hasta))
    ])

    res.json({
        total,
        usuarios
    })
}

const usersPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    // Encriptar la constraseña(hash)
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en base de datos
    await usuario.save()

    res.json({
        'msg': 'Usuario creado',
        usuario
    })

}

const usersPut = async (req, res = response) => {

    // const id = req.params.id
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        'msg': 'Usuario actualizado',
        usuario
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        'msg': 'patch API - controlador'
    })
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params

    // Borrarlo físicamente
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({
        'msg': `Usuario ${usuario.nombre} eliminado`
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}