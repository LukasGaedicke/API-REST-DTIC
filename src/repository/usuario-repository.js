'use strict'

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuarios', { usuario: String , senha : String, nome : String, token : String});


exports.autenticar = async(reqUsuario, reqSenha) => {
    var res = await Usuario.findOne({ usuario: reqUsuario , senha : reqSenha}, { __v: 0});
    return res;
}

exports.cadastrarToken = async(id, token) => {
    await Usuario.findByIdAndUpdate(id, {$set: {
        token: token
    }});
    return true;
}

exports.removerToken = async(id) => {
    await Usuario.findByIdAndUpdate(id, {$set: {
        token: ""
    }});
    return true;
}

exports.getUsuarioPorToken = async(token) => {
    var res = await Usuario.findOne({token: token}, { __v: 0});
    return res;
}

exports.verificarToken = async(token) => {
    var res = await Usuario.findOne({token: token}, { __v: 0});
    return res;
}



/*exports.editProduct = async(id, title,description , price ) => {
  await Product.findByIdAndUpdate(id, {$set: {
      title: title,
      description:description,
      price: price
  }});
}*/ 