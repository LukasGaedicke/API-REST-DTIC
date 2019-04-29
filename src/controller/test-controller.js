'use strict'
const repositoryTest = require('../repository/test-repository');

exports.get = async(req, res, next) => {
    try {
      var data  = await repositoryTest.get();
      res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
  };

  exports.getEmpty = async(req, res, next) => {
    try {
      var data  = await repositoryTest.getEmpty();
      res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
  };

  exports.getNotPattern = async(req, res, next) => {
    try {
      var data  = await repositoryTest.getNotPattern();
      res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
  };

  exports.getGenerateToken = async(req, res, next) => {
    try {
      var data  = await repositoryTest.getNewToken();
      res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
  };