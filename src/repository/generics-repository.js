'use strict'


const mongoose = require('mongoose');

const Header = mongoose.model('Header', { name: String });
const Alunos = mongoose.model('Aluno', { name: String });


const helper = require('../helper/montarJson');


exports.getHeaderGenerics = async (data) => {
  switch (data) {
    case "Alunos":
      var res = Header.findOne({ 'ref': data }, { __v: 0, _id: 0, ref: 0 });
      return res;
    case 'Teste':
      var res = Header.findOne({ 'ref': data }, { __v: 0, _id: 0 });
      return res;
    default:
      throw new Error();
  }


}

//headers
exports.getDataGenerics = async (data, inicio, fim, search) => {
  switch (data) {
    case "Alunos":
      if (search != "") {
        var res = await Alunos.find({'nome': new RegExp(search, 'i')},{ __v: 0, _id: 0}).skip(inicio).limit(fim);
        var totalF = await Alunos.find({'nome': new RegExp(search, 'i')},{ __v: 0, _id: 0}).count();
        var total = await Alunos.find({}).count();

        var jsonMontado = helper.montarJson(res, total, totalF);
        return jsonMontado;
      } else {
        var res = await Alunos.find({}, { __v: 0, _id: 0 }).skip(inicio).limit(fim);
        var total = await Alunos.find({}).count();
        var jsonMontado = helper.montarJson(res, total,total);
        return jsonMontado;
      }
      
    default:
      throw new Error();
  }

}