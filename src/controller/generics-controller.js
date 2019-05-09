'use strict'

const repositoryGenerics = require('../repository/generics-repository');

const utilitarios = require('../helper/utilitarios');
const filtro = require('../helper/filtrar');
const validator = require('../helper/validator');



exports.getHeaderAlunos = async (req, res, next) => {
  try {
    if (data != "") {
      var data = await repositoryGenerics.getHeaderGenerics(req.query.data);
      res.status(200).send(data);
    } else {
      throw Error();
    }
  } catch (e) {
    res.status(500).send({
      error: 'Falha ao processar a requisição.'
    });
  }
};

exports.getAlunos = async (req, res, next) => {
  try {
    if (data != "") {
      var data = req.query.data;
      var inicio = utilitarios.stringParaInt(req.query.start);
      var fim = utilitarios.stringParaInt(req.query.length);
      var search = req.query.search;
      var requisiçãoDados = [data, inicio, fim, search[0]];
      //var dadosFiltrados = filtro.getFiltrosDatatable(requisiçãoDados);

      var response = await repositoryGenerics.getDataGenerics(data, inicio, fim, search['value']);
      res.status(200).send(response);
    } else {
      throw Error();
    }
  } catch (e) {
    res.status(500).send({
      error: e
    });
  }
};
