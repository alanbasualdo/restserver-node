const Rol = require('../models/rol')
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está permitido`)
    }
}

const esEmailValido = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`)
    }
}

const existeUsuarioId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    esEmailValido,
    existeUsuarioId
}