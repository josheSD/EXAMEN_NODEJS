const express = require('express');
const router = express.Router();
const { usuarioController } = require('../controllers/usuarioController');
const { mdAutenticacion } = require('../middlewares/autenticacion');

router.get('/',mdAutenticacion.verificaToken ,usuarioController.getUsuario);
router.post('/post',usuarioController.postUsuario);
router.post('/login/normal',usuarioController.loginNormal);

module.exports = {
    router
}