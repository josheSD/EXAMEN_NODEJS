const express = require('express');
const router = express.Router();
const { CargoController } = require('../controllers/cargoController');

router.get('/',CargoController.getAll);

module.exports = {
    router
}