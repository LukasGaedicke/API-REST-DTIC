'use strict'


const express = require('express');
const data = require('../artifacts/text');

//atribuindo na const app o framework express
const app = express();
const router = express.Router();



router.get('/', (req, res, next) => {
    //retornando um Json
    res.status(200).send(data);
  });
  

app.use(router);
module.exports = app;