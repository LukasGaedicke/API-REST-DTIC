'use strict'


const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routerGenerics = require('./src/routes/generics-route');
const mongoose = require('mongoose');


//atribuindo na const app o framework express
const app = express();
var helmet = require('helmet');

//passa o ip/link do mongoBD
mongoose.connect(config.connString);

//setando o bodyParser
app.use(bodyParser.json({
  //limitando o JSON para até 5 mbs
  limit: '5mb'
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//para codificar a url
app.use(bodyParser.urlencoded({extended: false}));
//helmet segurança 
app.use(helmet());

app.use('/', routerGenerics);
module.exports = app;