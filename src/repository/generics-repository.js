'use strict'


const mongoose = require('mongoose');

const Header = mongoose.model('Header', { name: String });
const Alunos = mongoose.model('Aluno', { name: String });


const helper = require('../helper/montarJson');


exports.getHeaderGenerics = async (data) => {
  if (data == "Alunos") {
    var res = Header.findOne({'ref': data}, { __v: 0, _id: 0, ref:0 });
    return res;
  } else if(data == "Teste"){
    var res = Header.findOne({'ref': data}, { __v: 0, _id: 0 });
    return res;
  }else {
    throw new Error();
  }
}

//headers
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