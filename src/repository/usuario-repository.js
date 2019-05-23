'use strict'

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuarios', { usuario: String , senha : String, nome : String});


exports.autenticar = async(reqUsuario, reqSenha) => {
    var res = await Usuario.findOne({ usuario: reqUsuario , senha : reqSenha}, { __v: 0});
    return res;
}