'use strict'


const express = require('express');
const router  = express.Router();
const controllerAluno = require('../controller/generics-controller');

const controllerUsuario = require('../controller/usuario-controller');

const authService = require('../services/auth');

router.get('/menu', authService.authorizeNoBanco, controllerAluno.getMenus);
router.get('/header',  authService.authorizeNoBanco, controllerAluno.getHeader);
router.get('/',   authService.authorizeNoBanco, controllerAluno.getData);
router.get('/graficos',  authService.authorizeNoBanco, controllerAluno.getGraficos);



router.post('/login',  controllerUsuario.authenticate);
router.get('/logout',  authService.authorizeNoBanco, controllerUsuario.logout);

module.exports = router;