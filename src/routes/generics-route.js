'use strict'


const express = require('express');
const router  = express.Router();
const controllerAluno = require('../controller/generics-controller');

router.get('/menus',  controllerAluno.getMenus);
router.get('/header',  controllerAluno.getHeaderAlunos);
router.get('/',  controllerAluno.getAlunos);

module.exports = router;