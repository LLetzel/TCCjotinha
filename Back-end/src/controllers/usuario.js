// Importação do modelo de dados Usuario
const { CharsetToEncoding } = require('mysql2');
const Usuario = require('../models/usuario'); // Alterado de Usuarios para Usuario
const Usuario_Turma = require('../models/usuarios_turmas')
const { where } = require('sequelize');
const { response } = require('express');

// Função assíncrona que retorna uma lista de todos os usuários
exports.getAll = async (req, res) => {
    // Chamada ao método findAll do modelo Usuario para obter uma lista de todos os usuários
    const usuarios = await Usuario.findAll(); // Alterado de Usuarios para Usuario
    // Retorno da lista de usuários como JSON
    res.json(usuarios);
};

// Função assíncrona que retorna um usuário com base no seu ID
exports.getByCpf = async (req, res) => {
    // Obtenção do ID do usuário do parâmetro da requisição
    const { cpf } = req.params;
    // Chamada ao método findOne do modelo Usuario para obter um usuário com o ID especificado
    const usuarioEcontrado = await Usuario.findOne({ where: { cpf: cpf } }); // Alterado de Usuarios para Usuario
    // Retorno do usuário encontrado como JSON
    res.json(usuarioEcontrado);
};

// Função assíncrona que cria um novo usuário
exports.createrUsuario = async (req, res) => {
    try {
        // Verifica se o CPF está presente no corpo da requisição
        if (!req.body.cpf) {
            return res.status(400).send('O CPF é obrigatório.');
        }

        // Chamada ao método findOne do modelo Usuario para verificar se um usuário com o mesmo CPF já existe
        const usuarioCadastrado = await Usuario.findOne({ where: { cpf: req.body.cpf } });

        // Verificação da existência de um usuário com o mesmo CPF
        if (usuarioCadastrado) {
            // Retorno de uma mensagem de erro se um usuário com o mesmo CPF já existir
            return res.send('Já existe um usuário cadastrado neste CPF.');
        }

        // Chamada ao método create do modelo Usuario para criar um novo usuário com os dados fornecidos no corpo da requisição
        const usuarioCriado = await Usuario.create(req.body);

        if (usuarioCriado.idUsuarios && req.body.idTurma) {
            await Usuario_Turma.create({
                Usuarios_idUsuarios: usuarioCriado.idUsuarios,
                Turmas_idTurmas: req.body.idTurma
            });
        }

        // Impressão no console do objeto usuário criado
        console.log('usuarioCriado', usuarioCriado);

        // Verificação para obtenção de usuário
        const tipoUsuario = req.body.Tipos_Usuarios_idTipos_Usuarios;

        if (tipoUsuario == 1) {
            return res.send('Usuário cadastrado como aluno!');
        } else if (tipoUsuario == 2) {
            return res.send('Usuário cadastrado como professor!');
        }

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        // Retorno de uma mensagem de erro em caso de falha na criação do usuário
        return res.status(500).send('Erro ao criar usuário. Por favor, tente novamente.');
    }
};

exports.updateUser = async (req, res) => {
    const { cpfUser } = req.params.cpf

    try {
        const user = await Usuario.findOne({ where: { cpf: cpfUser } })

        if (user) {

            if (req.body.cpf) {
                delete req.body.cpf;
            }

            const [numRowsUpdate] = await Usuario.update(req.body, { where: { cpf: cpfUser } });

            if (numRowsUpdate > 0) {
                const userUpdate = await Usuario.findOne({ where: { cpf: cpfUser } });
                return res.send({ message: 'Usuario atualizado com sucesso', dadosUsuario: userUpdate });
            } else {
                return res.send('Erro ao atualizar dados, novos dados não encontrados...');
            }
        }
    } catch {

    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar o usuário pelo ID
        const usuario = await Usuario.findByPk(id);

        // Verificar se o usuário existe
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado!');
        }

        // Buscar e destruir o registro relacionado, se existir
        const desvincular = await Usuario_Turma.findOne({ where: { Usuarios_idUsuarios: usuario.idUsuarios } });

        if (desvincular) {
            await desvincular.destroy();
        }

        // Destruir o usuário
        await usuario.destroy();

        // Enviar resposta de sucesso
        res.status(200).send('Usuário deletado com sucesso!');
    } catch (err) {

        // Tratamento de erro
        console.error('Erro ao deletar o usuário:', err);
        res.status(500).send('Erro ao deletar o usuário.');
    }
};

exports.login = async (req, res) => {
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