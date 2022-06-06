const validarCampos = require('../middlewares/validar-campos')
const validarRoles = require('../middlewares/validar-roles')
const validarJWT = require('../middlewares/validarJWT')
const validarArchivo = require('./validar-archivo')

module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarJWT,
    ...validarArchivo
}