'use strict'
/*
Algumas observações sobre essa classe: 
- A base de todo o sistema é a collection Header. 
  - Nela é busca a referencia das tabelas com os dados. 
  - O Header é montado apartir dela.
  - Quais dados devem ser apresentados, são mapeados por ela.
  - tabelaReferencia da colletion Header é o campo que referencia uma tabela com os dados

- O menu é uma ocorrência estática no código. 
- O moongose busca as tabelas no plural. Logo as collentions devem estar no plural.
- Alguns "pogs" foram necessários: 
  - As consultados com o mongoDB/moongose recebem como entrada um Json. {"nome" : "halls"}
    - Assim ás vezes foi necessário forçar o formato. 
    - Nota: { UMA VARIAVEL AQUI NÃO É ACEITA: "halls"} <-- Grande motivo dos "pogs".
*/ 


const mongoose = require('mongoose');

const Header = mongoose.model('Header', { nome: String });
const Grafico = mongoose.model('Graficos', { nome: String });
const MENUS = mongoose.model('Menu', { nome: String });
const helper = require('../helper/montarJson');



const parseJsonAsync = (jsonString) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString))
    })
  })
}


exports.getGraficos = async (data) => {
  var res = await Grafico.findOne({ 'referencia': data }, { __v: 0, _id: 0, referencia: 0 });
  return res;
}

exports.getMenus = async () => {
  var res = await MENUS.find({}, { __v: 0, _id: 0, tabelaReferencia: 0, nome: 0 });
  return res;
}

exports.getHeaderGenerics = async (data) => {
  var res = await Header.findOne({ 'tabelaReferencia': data }, { __v: 0, _id: 0, tabelaReferencia: 0 });
  return res;
}

exports.getDataGenerics = async (data, inicio, fim, search, ascOuDesc, nameCollumn, vetorDadosSelect) => {
  const GenericModel = await getModel(data);
  if (GenericModel != null) {
    if (search != "") {
     
      return await buscaComFiltro(GenericModel, inicio, fim, search, nameCollumn, ascOuDesc, vetorDadosSelect);
    } else {


      return await buscaSemFiltro(GenericModel, inicio, fim, ascOuDesc, nameCollumn, vetorDadosSelect);
    }
  } else {
    throw Error("Essa entidade não existe.");
  }
}


async function montarVetorJsonConsultaFiltro(vetorHeaders, searchValue) {
  var vetorHeadersInJson = [];

  let i = 0;
  for (const x in vetorHeaders) {

    var jsonChumbado = '{"' + vetorHeaders[i] + '": "Woollooo!"}';
    var parseToJason = await parseJsonAsync(jsonChumbado);

    parseToJason['' + vetorHeaders[i] + ''] = new RegExp(searchValue, 'i');
    vetorHeadersInJson[i] = parseToJason;
    i++;
  }

  return vetorHeadersInJson;
}


async function buscaComFiltro(MODEL, inicio, fim, search, nameCollumn, ascOuDesc, vetorData) {

  var montarJson = '{"' + nameCollumn + '":"' + ascOuDesc + '"}';
  var parseJsonSort = await parseJsonAsync(montarJson);


  var vetorDadosFiltrar = await montarVetorJsonConsultaFiltro(vetorData, search);


  var res = await MODEL.find({ $or: vetorDadosFiltrar }, vetorData, { projection: { __v: 0, _id: 0 } })
    .sort(parseJsonSort)
    .skip(inicio)
    .limit(fim);


  var totalF = await MODEL.find({ $or: vetorDadosFiltrar })
    .count();

  var total = await MODEL.find({})
    .count();

    return [res, total, totalF];
}
async function buscaSemFiltro(MODEL, inicio, fim, ascOuDesc, nameCollumn, vetorData) {

  var montarJson = '{"' + nameCollumn + '":"' + ascOuDesc + '"}';
  var parseJsonSort = await parseJsonAsync(montarJson);

  var res = await MODEL.find({}, vetorData, { projection: { __v: 0, _id: 0 } })
    .sort(parseJsonSort)
    .skip(inicio)
    .limit(fim);

  var total = await MODEL.find({}).count();

  return [res, total, total];
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



exports.getNomeHeaders = async (MODEL) => {

  var vetorHeaders = [];
  var headers = await Header.findOne({ 'tabelaReferencia': MODEL }, { __v: 0, _id: 0, tabelaReferencia: 0 });
  var headersToJson = helper.montarJsonHeader(headers);

  var keysDoJsonHeader = Object.keys(headersToJson.data[0].toJSON());

  let i = 0;
  for (const x in keysDoJsonHeader) {
    vetorHeaders[i] = keysDoJsonHeader[i];
    i++;
  }
  // RETORNO EXEMPLO: Keys de um header de aluno -- [ 'nome', 'matricula', 'curso', 'ano_ingresso' ]
  return vetorHeaders;
}
