'use strict'

const repositoryGenerics = require('../repository/generics-repository');

const utilitarios = require('../helper/utilitarios');
const filtro = require('../helper/filtrar');
const validator = require('../helper/validator');



exports.getHeaderAlunos = async (req, res, next) => {
  try {
    var data = await repositoryGenerics.getHeaderGenerics(req.query.data);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e, {
      message: 'Falha ao processar a requisição.'
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

      var requisiçãoDados = [data, inicio, fim, search];
      //var dadosFiltrados = filtro.getFiltrosDatatable(requisiçãoDados);
      
      if (validator.getVerificarInicioMenor(inicio, fim) != false) {
        var response = await repositoryGenerics.getDataGenerics(data, inicio,fim);
        res.status(200).send(response);
      } else {
        throw Error();
      }

    } else {
      throw Error();
    }
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição.'
    });
  }
};
