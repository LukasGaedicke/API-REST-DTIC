'use strict'

const repositoryGenerics = require('../repository/generics-repository');

const mongoose = require('mongoose');
const modelAlunos = require('../models/Aluno');
const Alunos = mongoose.model('Aluno');

const helperParse = require('../helper/text-in-int');

exports.getHeaderAlunos = async (req, res, next) => {
  try {
    var data = await repositoryGenerics.getHeaderGenerics(req.query.data);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição.'
    });
  }
};

exports.getAlunos = async (req, res, next) => {
  try {
    var inicio = helperParse.parseTextToInt(req.query.inicio);
    var fim = helperParse.parseTextToInt(req.query.fim);
    if (inicio < fim) {
      var data = req.query.data;
      var limit = inicio - fim;
      var response = await repositoryGenerics.getDataGenerics(data, inicio, limit);
      res.status(200).send(response);

    } else {
      throw Error();
    }

  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição.'
    });
  }
};
