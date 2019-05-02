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
    var quantidade = helperParse.parseTextToInt(req.query.quantidade);
    if (quantidade != 0) {
      var data = await repositoryGenerics.getDataGenerics(req.query.data, quantidade);
      var test = { "data": data }
      res.status(200).send(test);
    } else {
      throw new Error();
    }

  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição.'
    });
  }
};
