'use strict'


const express = require('express');
const router  = express.Router();
const controllerAluno = require('../controller/generics-controller');

const controllerUsuario = require('../controller/usuario-controller');

const authService = require('../services/auth');

router.get('/menu', authService.authorize, controllerAluno.getMenus);
router.get('/header',  authService.authorize, controllerAluno.getHeaderAlunos);
router.get('/',   controllerAluno.getAlunos);



router.post('/login',  controllerUsuario.authenticate);
router.post('/refresh-token', authService.authorize, controllerUsuario.refreshToken);
module.exports = router;