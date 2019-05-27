'use strict'

const repositoryGenerics = require('../repository/generics-repository');

const utilitarios = require('../helper/utilitarios');
const filtro = require('../helper/filtrar');
const validator = require('../helper/validator');

const helper = require('../helper/montarJson');

exports.getMenus = async (req, res, next) => {
  try {
      var menu = await repositoryGenerics.getMenus();
      res.status(200).send(menu);
  
  } catch (e) {
    res.status(500).send({
      error: 'Falha ao processar a requisição.'
    });
  }
};

exports.getHeaderAlunos = async (req, res, next) => {
  try {
    var data = req.query.data;
    //if (utilitarios.isEmpty(data)) {
      var header = await repositoryGenerics.getHeaderGenerics(data);
      var jsonMontado = helper.montarJsonHeader(header);
      res.status(200).send(jsonMontado);
   /* } else {
      throw Error();
    }*/
  } catch (e) {
    res.status(500).send({
      error: 'Falha ao processar a requisição.'
    });
  }
};

exports.getAlunos = async (req, res, next) => {
  try {
    var data = req.query.data;
    
    //if (utilitarios.isEmpty(data) != true) {
      var start = utilitarios.stringParaInt(req.query.start);
      var length = utilitarios.stringParaInt(req.query.length);
      var searchValue = req.query.search;
     
      var order = req.query.order[0].column;
      var nameCollumn = req.query.columns[order].data;
      var ascOuDesc = req.query.order[0].dir;
      
      var response = await repositoryGenerics.getDataGenerics(data, start, length, searchValue['value'],ascOuDesc, nameCollumn);
      res.status(200).send(response);
    /*} else {
      throw Error();
    }*/
  } catch (e) {
    res.status(500).send({
      error: e
    });
  }
};
