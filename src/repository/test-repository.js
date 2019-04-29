'use strict'
const authService = require('../service/auth');

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

  exports.getNewToken = async() => {
    const token = await authService.generateToken({name : 'teste'});
  return token;
  }