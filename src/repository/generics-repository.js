'use strict'


const mongoose = require('mongoose');

const Header = mongoose.model('Header', { nome: String });
const MENUS = mongoose.model('Menu', { nome: String });
const Usuario = mongoose.model('Usuario', { usuario: String, senha: String, nome: String });
//const Alunos = mongoose.model('Aluno', { name: String });
const helper = require('../helper/montarJson');
const utils = require('../helper/utilitarios');


const parseJsonAsync = (jsonString) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString))
    })
  })
}


exports.getMenus = async () => {
  var res = await MENUS.find({}, { __v: 0, _id: 0, ref: 0, nome: 0 });
  if (res != "") {
    return res;
  } else {
    throw Error();
  }
}

exports.getHeaderGenerics = async (data) => {
  var res = await Header.findOne({ 'ref': data }, { __v: 0, _id: 0, ref: 0 });
  //verificar retorno para vazio
  //console.log(res);
  return res;
}

exports.getDataGenerics = async (data, inicio, fim, search, ascOuDesc, nameCollumn) => {
  const GenericModel = await getModel(data);
  if (GenericModel != null) {

    if (search != "") {
      return await buscaComFiltro(GenericModel, inicio, fim, search, nameCollumn,ascOuDesc);
    } else {
      return await buscaSemFiltro(GenericModel, inicio, fim, ascOuDesc, nameCollumn);
    }
  } else {
    throw Error("Essa entidade não existe.");
  }
}

async function buscaComFiltro(MODEL, inicio, fim, search, nameCollumn,ascOuDesc ) {

  var montarJson = '{"' + nameCollumn + '":"' + ascOuDesc + '"}';
  var parseJsonSort = await parseJsonAsync(montarJson);

  var res = await MODEL.find({ "nome": new RegExp(search, 'i') }, { __v: 0, _id: 0 })
    .sort(parseJsonSort)
    .skip(inicio)
    .limit(fim);


  var totalF = await MODEL.find({ "nome": new RegExp(search, 'i') }, { __v: 0, _id: 0 })
    .count();

  var total = await MODEL.find({})
    .count();

  var jsonMontado = helper.montarJson(res, total, totalF);
  return jsonMontado;
}


async function buscaSemFiltro(MODEL, inicio, fim, ascOuDesc, nameCollumn) {

  var montarJson = '{"' + nameCollumn + '":"' + ascOuDesc + '"}';
  var parseJsonSort = await parseJsonAsync(montarJson);

  var res = await MODEL.find({}, { __v: 0, _id: 0 })
    .sort(parseJsonSort)
    .skip(inicio)
    .limit(fim);

  var total = await MODEL.find({})
    .sort(parseJsonSort)
    .count();

  var jsonMontado = helper.montarJson(res, total, total);
  return jsonMontado;
}


async function getModel(data) {

  //QUANDO MONGOOSE CRIA A ENTIDADE, ELE COLOCA PARA PLURAL. EX-> TESTE fica TESTES, PLAY fica PLAYS
  var Model = null;
  try {
    Model = mongoose.model(data);
    return Model;
  } catch (e) {
    if (await verificarExistenciaModel(data) != false) {
      Model = mongoose.model(data, { nome: String });
      return Model;
    } else {
      return Model;
    }
  }
}

async function verificarExistenciaModel(data) {
  var res = await Header.find({ 'ref': data });
  if (res != "") {
    return true;
  } else {
    return false;
  }

}

