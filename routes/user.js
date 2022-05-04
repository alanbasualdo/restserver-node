const { Router } = require('express')
const { check } = require('express-validator')
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users')
const { esRolValido, esEmailValido, existeUsuarioId } = require('../helpers/db-validators')
const {validarCampos, validarJWT, adminRol, tieneRol} = require('../middlewares')

const router = Router()

router.get('/', usersGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 dígitos').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(esEmailValido),
    // check('rol', 'Rol no válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(esRolValido),
    validarCampos
], usersPost)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
], usersPut)

router.patch('/', usersPatch)

router.delete('/:id', [
    validarJWT,
    // adminRol,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usersDelete)

module.exports = router;