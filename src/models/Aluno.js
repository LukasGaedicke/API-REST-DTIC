'use strict'

const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const schema  = new Schema({
    nome: {
          type: String,
          required: true,
      }, 
    matricula:{
        type: String,
        required: true,
    }, 
    curso:{
        type: String,
        required: true,
    }, ano_ingresso:{
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Aluno', schema);
