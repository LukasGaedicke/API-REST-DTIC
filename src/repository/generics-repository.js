'use strict'

const mongoose = require('mongoose');
const modelAlunos = require('../models/Aluno');
const Alunos = mongoose.model('Aluno');
const helper = require('../helper/montarJson');

const headerAlunos = require('../JsonForTests/jsonHeaderAlunos');

exports.getHeaderGenerics = async (data) => {
  if (data == "Alunos") {
    return headerAlunos;
  } else {
    throw new Error();
  }
}

exports.getDataGenerics = async (data, inicio, fim) => {
  if (data == "Alunos") {
    var res = await Alunos.find({}, { __v: 0, _id: 0 }).skip(inicio).limit(fim);
    var total = await Alunos.find({}).count();
    var jsonMontado = helper.montarJson(res, total);
    return jsonMontado;
  } else {
    throw new Error();
  }


}