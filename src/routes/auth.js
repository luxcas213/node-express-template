const express = require('express');

const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.get('/login', AuthController.cargarLoginHtml);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;