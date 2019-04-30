'use strict'

const mongoose = require('mongoose');
const modelAlunos = require('../models/Aluno');
const Alunos = mongoose.model('Aluno');

const headerAlunos = require('../JsonForTests/jsonHeaderAlunos');
exports.getHeaderAluno = async() => {
    var res = headerAlunos;
    return res;
  }

exports.getAlunos = async() => {
  var res = await  Alunos.find({});
  return res;
}