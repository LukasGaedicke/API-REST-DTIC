'use strict';
const jwt = require('jsonwebtoken');
const repositoryUsuario = require('../repository/usuario-repository');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1y'});
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

exports.authorizeNoBanco = async function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var retornoToken = await repositoryUsuario.verificarToken(token);
    if (retornoToken == null) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        next();
    }
    
};
