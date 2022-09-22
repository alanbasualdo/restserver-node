const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJWT')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {

    const { correo, password } = req.body

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña inválido/s'
            })
        }

        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario desactivado'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña inválido/s'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body

    try {
        const { nombre, img, correo } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: 'asd',
                img,
                google: true,
                rol: 'USER_ROL'
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: 'false',
            msg: 'El token no se pudo verificar'
        })
    }

}

const renovarToken = async (req, res = response) => {

    const { usuario } = req

    // Generar el JWT
    const token = await generarJWT(usuario.id)

    res.json({
        usuario,
        token
    })

}

module.exports = {
    login,
    googleSingIn,
    renovarToken
}