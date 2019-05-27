'use strict'

const helper = require('../helper/utilitarios'); 
const repositoryUsuario = require('../repository/usuario-repository');
const authService = require('../services/auth');




exports.authenticate = async (req, res, next) => {
    try {
        
      /*  if (helper.isEmpty(req.body.usuario) || helper.isEmpty(req.body.senha)) {
            res.status(404).send({
                error: 'Os campos não podem ser vazios.'
            });
        }*/
        const usuario = await repositoryUsuario.autenticar(req.body.usuario, req.body.senha);
        if (!usuario) {
            res.status(500).send({
                error: 'Usuário ou senha inválidos'
            });
            return;
        }


        var token = await authService.generateToken({
            id: usuario._id,
            usuario: usuario.usuario,
            nome: usuario.nome,
            senha: usuario.senha
        });
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

exports.refreshToken = async (req, res, next) => {
    try {
        // obtendo as info do token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const usuario = await repositoryUsuario.autenticar(req.body.usuario, req.body.senha);

        if (!usuario) {
            res.status(404).send({
                error: 'Usuário não encontrado.'
            });
            return;
        }

        var tokenAux = await authService.generateToken({
            id: usuario._id,
            usuario: usuario.usuario,
            nome: usuario.nome,
            senha: usuario.senha
        });
        res.status(200).send({
            nome: usuario.nome,
            token: tokenAux

        });

    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar a requisição.'
        });
    }
};