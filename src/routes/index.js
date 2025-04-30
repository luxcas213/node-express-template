const express = require('express');
const verifyToken = require('../middlewares/auth.middleware');
const IndexController = require('../controllers/indexController');
const router = express.Router();


router.get('/',verifyToken,IndexController.loadHtml);
router.post('/ubicaciones',verifyToken, IndexController.cargarUbicaciones); //verificar token antes de cargar ubicaciones

module.exports = router;