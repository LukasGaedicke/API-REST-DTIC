'use strict'
const express = require('express');


exports.get = async() => {
    var res = await  require('../JsonForTests/textSucess');
    return res;
  }

  
  exports.getEmpty = async() => {
    var empty = {"data": []};
    var res = await empty;
    return res;
  }

  exports.getNotPattern = async() => {
    var res = await require('../JsonForTests/jsonNotPattern');
    return res;
  }
