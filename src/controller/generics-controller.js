'use strict'

const repositoryGenerics = require('../repository/generics-repository');

const utilitarios = require('../helper/utilitarios');

const helper = require('../helper/montarJson');

exports.getMenus = async (req, res, next) => {
  try {
    var menu = await repositoryGenerics.getMenus();
    if (menu != null) {
      res.status(200).send(menu);
    } else {
      throw Error("Menus não cadastrados.");
    }
  } catch (e) {
    res.status(500).send({
      error: e.message
    });
  }
};

exports.getHeader = async (req, res, next) => {
  try {
    var data = req.query.data;

    if (utilitarios.isEmpty(data) != true) {
      var header = await repositoryGenerics.getHeaderGenerics(data);
    } else {
      throw Error("Esse campo não pode ser vazio.");
    }

    if (header != null) {
      res.status(200).send(helper.montarJsonHeader(header));
    } else {
      throw Error("Erro na consulta.");
    }

  } catch (e) {
    res.status(500).send({
      error: e.message
    });
  }
};

exports.getData = async (req, res, next) => {
  try {
    var data = req.query.data;

    if (utilitarios.isEmpty(data) != true) {
      var start = utilitarios.stringParaInt(req.query.start);
      var length = utilitarios.stringParaInt(req.query.length);
      var searchValue = req.query.search;

      var order = req.query.order[0].column;
      var nameCollumn = req.query.columns[order].data;
      var ascOuDesc = req.query.order[0].dir;

      var vetorHeader = await repositoryGenerics.getNomeHeaders(data);
      var response = await repositoryGenerics.getDataGenerics(data, start, length, searchValue['value'], ascOuDesc, nameCollumn, vetorHeader);

      if (response[0] != null && response[1] != null && response[2] != null) {
        res.status(200).send(helper.montarJson(response));
      } else {
        throw Error("Erro na consulta.");
      }

    } else {
      throw Error("Esse campo não pode ser vazio.");

    }
  } catch (e) {
    res.status(500).send({
      error: e.message
    });
  }
};





exports.getGraficos = async (req, res, next) => {
  try {
    if (utilitarios.isEmpty(req.query.data) != true) {
      var grafico = await repositoryGenerics.getGraficos(req.query.data);
    } else {
      throw Error("Esse campo não pode ser vazio.");
    }

    if (grafico != null) {
      res.status(200).send(helper.montarJsonGrafico(grafico));
    } else {
      throw Error("Esse gráfico não existe.");
    }
  } catch (e) {
    res.status(500).send({
      error: e.message
    });
  }
};

