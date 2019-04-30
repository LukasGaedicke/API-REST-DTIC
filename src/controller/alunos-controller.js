'use strict'

const repositoryAluno = require('../repository/alunos-repository');

const mongoose = require('mongoose');
const modelAlunos = require('../models/Aluno');
const Alunos = mongoose.model('Aluno');

exports.getHeaderAlunos = async(req, res, next) => {
    try {
      var data  = await repositoryAluno.getHeaderAluno();
      res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
  };

  exports.getAlunos = async(req, res, next) => {
    try {
      var data  = await repositoryAluno.getAlunos();
      res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
  };
