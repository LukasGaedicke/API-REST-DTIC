'use strict'

const helper = require('../helper/utilitarios');
const repositoryUsuario = require('../repository/usuario-repository');
const authService = require('../services/auth');


exports.logout = async (req, res, next) => {
    try {
        var usuario = await authService.decodeToken(req.query.token);
        var removerToken = await repositoryUsuario.removerToken(usuario.id);
        res.status(200).send();
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }

}

exports.authenticate = async (req, res, next) => {
    try {

        if (helper.isEmpty(req.body.usuario) || helper.isEmpty(req.body.senha)) {
            res.status(500).send({
                error: 'Os campos não podem ser vazios.'
            });
        }
        var usuario = await repositoryUsuario.autenticar(req.body.usuario, req.body.senha);
        if (!usuario) {
            res.status(500).send({
                error: 'Usuário ou senha inválidos'
            });
            return;
        }


        var token = await authService.generateToken({
            id: usuario._id,
            usuario: usuario.usuario,
            nome: usuario.nome
        });

        var saveToken = await repositoryUsuario.cadastrarToken(usuario._id, token);

        res.status(200).send({
            nome: usuario.nome,
            token: token

        });
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }
};

