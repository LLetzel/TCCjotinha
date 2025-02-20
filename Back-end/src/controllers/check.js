// Importação do modelo de dados Usuario
const { CharsetToEncoding } = require('mysql2');
const Usuario = require('../models/usuario'); // Alterado de Usuarios para Usuario
const { where } = require('sequelize');
const { response } = require('express');

exports.loginCpf = async (req, res) => {
    try {
        const { cpf, senha, key } = req.body;

        const findCpf = await Usuario.findOne({ where: { cpf: cpf } });

        if (findCpf) {
            // Retorno de uma mensagem de sucesso se um usuário com o mesmo CPF já existir
            return res.json({
                ok: "true",
            });
        } else {
            // Retorno de uma mensagem de erro se o usuário com o CPF não existir
            return res.json({
                ok: "false",
            });
        }   

           
    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: 'Internal Server Error',
        });
    }
}

exports.loginPassword = async (req, res) => {
    const { senha, cpf } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { cpf } });

        // Verifica se a senha fornecida corresponde à senha armazenada
        if (usuario.senha !== senha) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Se a senha estiver correta, retorna sucesso
        return res.json({ ok: true });
    } catch (err) {
        console.error('Erro ao autenticar:', err);
        return res.status(500).json({ error: 'Erro ao autenticar' });
    }
}