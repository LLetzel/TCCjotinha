const {
    CharsetToEncoding
} = require('mysql2');
const User = require('../models/users.js');
const {
    where
} = require('sequelize');
const {
    response
} = require('express');
const {
    verifyEncrypt,
    encrypting
} = require('../utils/encrypt.js');
const session = require('express-session');

exports.authLogin = async (req, res) => {
    try {
        
        if (req.session.user) {
            return res.status(200).json({
                success: false,
                response: 'Usuário já está logado',
            });
        }

        const { ramal, password } = req.body;

        if (!ramal || !password) {
            return res.status(400).json({
                success: false,
                response: 'Todos os campos precisam estar preenchidos',
            });
        }

        const user = await User.findOne({
            where: {
                ramal
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                response: 'Usuário ou senha incorretos',
            });
        }

        const passwordMatch = await verifyEncrypt(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                response: 'Usuário ou senha incorretos',
            });
        }

        req.session.user = {
            id: user.id,
            ramal: user.ramal,
        };

        return res.status(200).json({
            success: true,
            response: 'Login bem-sucedido!',
            user: req.session.user,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            response: 'Erro interno do servidor',
        });
    }
}

exports.authCadastro = async (req, res) => {
    try {

        const {
            ramal,
            email,
            password
        } = req.body;

        if (!ramal || !email || !password) {
            return res.status(400).send('Todos os campos precisam estar preenchidos!');
        }

        const user = await User.findOne({
            where: {
                ramal: ramal
            }
        });
        if (user) {
            return res.status(409).send('O ramal já está cadastrado');
        } else {
            try {

                const hashedPassword = await encrypting(password);

                req.body.password = hashedPassword;

                const cadastrar = await User.create(req.body);

                if (cadastrar) {
                    return res.status(201).send('Usuário cadastrado com sucesso.');
                }

                return res.status(500).json({
                    success: false,
                    response: 'Erro ao cadastrar usuário, tente novamente.'
                });

            } catch (err) {
                console.error('Erro ao criptografar a senha ou cadastrar usuário:', err);
                return res.status(500).json({
                    success: false,
                    response: 'Erro ao processar sua solicitação. Por favor, tente novamente.'
                });
            }
        }

    } catch (err) {
        console.error('Erro ao criptografar a senha ou cadastrar usuário:', err);
        return res.status(500).json({
            success: false,
            response: 'Erro ao processar sua solicitação. Por favor, tente novamente.'
        });
    }
}