const { response } = require("express")
const usuario = require("../models/usuario")

const adminRol = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }

    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }

    next()

}

const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}. Rol actual ${req.usuario.rol}`
            })
        }

        next()

    }

}

module.exports = {
    adminRol,
    tieneRol
}