'use strict'


const mongoose = require('mongoose');

const Header = mongoose.model('Header', { nome: String });
const MENUS = mongoose.model('Menu', { nome: String });
const Usuario = mongoose.model('Usuario', { usuario: String, senha: String, nome: String });
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
  var res = await MENUS.find({}, { __v: 0, _id: 0, tabelaReferencia: 0, nome: 0 });
  if (res != "") {
    return res;
  } else {
    throw Error();
  }
}

exports.getHeaderGenerics = async (data) => {
  var res = await Header.findOne({ 'tabelaReferencia': data }, { __v: 0, _id: 0, tabelaReferencia: 0 });
  //verificar retorno para vazio
  //console.log(res);
  return res;
}

exports.getDataGenerics = async (data, inicio, fim, search, ascOuDesc, nameCollumn) => {
  const GenericModel = await getModel(data);
  if (GenericModel != null) {
    if (search != "") {
      var vetorDadosSelect = await montarConsultaComDadosHeader(GenericModel);
      return await buscaComFiltro(GenericModel, inicio, fim, search, nameCollumn, ascOuDesc, vetorDadosSelect);
    } else {

      var vetorDadosSelect = await montarConsultaComDadosHeader(GenericModel);
      return await buscaSemFiltro(GenericModel, inicio, fim, ascOuDesc, nameCollumn, vetorDadosSelect);
    }
  } else {
    throw Error("Essa entidade não existe.");
  }
}

async function buscaComFiltro(MODEL, inicio, fim, search, nameCollumn, ascOuDesc, vetorData) {

  var montarJson = '{"' + nameCollumn + '":"' + ascOuDesc + '"}';
  var parseJsonSort = await parseJsonAsync(montarJson);


  var xesque = [];
  

  //{ "ano_ingresso" : /.*20*./i }

  let i = 0;
  for (const x in vetorData) {
    
   // var c = vetorData[i].toString();
   var cx   = '{"' + vetorData[i] + '": "ca"}'; 
   var c = await parseJsonAsync(cx);
   c[''+vetorData[i]+''] =  new RegExp(search, 'i');
   xesque[i] = c;
    i++;
  }

  var res = await MODEL.find({ $or: xesque } , vetorData, { projection: { __v: 0, _id: 0 } })
    .sort(parseJsonSort)
    .skip(inicio)
    .limit(fim);


  var totalF = await MODEL.find({ "nome": new RegExp(search, 'i') })
    .count();

  var total = await MODEL.find({})
    .count();

  var jsonMontado = helper.montarJson(res, total, totalF);
  return jsonMontado;
}

async function buscaSemFiltro(MODEL, inicio, fim, ascOuDesc, nameCollumn, vetorData) {

  var montarJson = '{"' + nameCollumn + '":"' + ascOuDesc + '"}';
  var parseJsonSort = await parseJsonAsync(montarJson);

  var res = await MODEL.find({}, vetorData, { projection: { __v: 0, _id: 0 } })
    .sort(parseJsonSort)
    .skip(inicio)
    .limit(fim);

  var total = await MODEL.find({}).count();

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
  var res = await Header.find({ 'tabelaReferencia': data });
  if (res != "") {
    return true;
  } else {
    return false;
  }

}


async function montarConsultaComDadosHeader(MODEL) {

  var vetorData = [];
  var qual = await Header.findOne({ 'tabelaReferencia': MODEL }, { __v: 0, _id: 0, tabelaReferencia: 0 });
  var xx = helper.montarJsonHeader(qual);

  var keysDoJsonHeader = Object.keys(xx.data[0].toJSON());

  let i = 0;
  for (const x in keysDoJsonHeader) {
    vetorData[i] = keysDoJsonHeader[i];
    i++;
  }

  return vetorData;
}