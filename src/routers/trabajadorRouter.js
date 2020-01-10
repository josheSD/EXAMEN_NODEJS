const express = require('express');
const router = express.Router();
const { TrabajadorController } = require('../controllers/trabajadorController');

router.get('/',TrabajadorController.getAll);
router.get('/one/:id',TrabajadorController.getOne);
router.post('/',TrabajadorController.postTrabajador);
router.delete('/:id',TrabajadorController.deleteTrabajador);
router.put('/',TrabajadorController.updateTrabajador);

module.exports = {
    router
}