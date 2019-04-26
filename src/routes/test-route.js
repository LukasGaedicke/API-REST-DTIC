'use strict'


const express = require('express');
//instanciando as rotas do express
const router  = express.Router();


const controllerTest = require('../controller/test-controller');

router.get('/', controllerTest.get);
router.get('/empty', controllerTest.getEmpty);
router.get('/dataNotPattern', controllerTest.getNotPattern);

module.exports = router;