const { response, request } = require('express')

const usersGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey } = req.query

    res.json({
        'msg': 'get API - controlador',
        q,
        nombre,
        apikey
    })
}

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        'msg': 'post API - controlador',
        nombre, edad
    })

}

const usersPut = (req, res = response) => {

    // const id = req.params.id
    const { id } = req.params

    res.json({
        'msg': 'put API - controlador',
        id
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        'msg': 'patch API - controlador'
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        'msg': 'delete API - controlador'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}