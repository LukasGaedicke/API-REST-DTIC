'use strict'


const express = require('express');
//instanciando as rotas do express
const router  = express.Router();
const controllerTest = require('../controller/test-controller');
const authService = require('../service/auth');

router.get('/', authService.authorize , controllerTest.get);
router.get('/empty', controllerTest.getEmpty);
router.get('/dataNotPattern', controllerTest.getNotPattern);


router.get('/generateToken', controllerTest.getGenerateToken);
module.exports = router;