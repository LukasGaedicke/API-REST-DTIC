'use strict'

const mongoose = require('mongoose');
const modelAlunos = require('../models/Aluno');
const Alunos = mongoose.model('Aluno');

const headerAlunos = require('../JsonForTests/jsonHeaderAlunos');

exports.getHeaderGenerics = async(data) => {
    if (data == "Alunos") {
      return headerAlunos;
    }else{
      throw new Error();
    }
  }

  exports.getDataGenerics = async(data, quantidade) => {
    if (data == "Alunos") {
    return await  Alunos.find({}, {__v:0, _id:0}).limit(quantidade);  
  }else{
    throw new Error();
  }
  
    
}