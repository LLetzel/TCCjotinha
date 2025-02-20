// controllers/turmaController.js
const { Op } = require('sequelize');
const Turma = require('../models/turma'); 
const Usuario = require('../models/usuario');

exports.getAll = async (req, res) => {
    try {
        const turmas = await Turma.findAll(); 
        res.json(turmas);
    } catch (error) {
        console.error('Erro ao obter todas as turmas:', error);
        res.status(500).send('Erro ao obter todas as turmas. Por favor, tente novamente.');
    }
};

exports.createTurma = async (req, res) => {

    const textErros = {
        codigo: 'O código é obrigatório',
        descricao: 'A descrição é obrigatória',
        inicio: 'A data de início é obrigatória',
        fim: 'A data de fim é obrigatória'
    }

    try {
        const { codigo, descricao, inicio, fim } = req.body;

        const fileName = '/image/' + req.file.filename;

        const camposObrigatorios = ['codigo', 'descricao', 'inicio', 'fim'];

        for (let campo of camposObrigatorios) {
            if (!req.body[campo]) {
                console.log(textErros[campo])
                return res.send(textErros[campo]);
            }
        }

        const turmaCadastrada = await Turma.findOne({ where: { codigo: codigo } });

        if (turmaCadastrada) {
            return res.json({
                ok: false,
                message: 'Turma ja cadastrada'
            });
        }

        const createTurma = await Turma.create({
            codigo: codigo,
            descricao: descricao,
            inicio: inicio,
            fim: fim,
            fotos: fileName // Assuming 'fotos' is the field where you want to store the file name
        });

        if (createTurma) {
            return res.json({
                ok: false,
                message: 'Turma criada'
            });
        } else {
            return res.json({
                ok: false,
                message: 'Erro ao criar turma'
            });
        }
    } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        res.status(500).send('Erro ao fazer upload do arquivo. Por favor, tente novamente.');
    }
};


exports.updateTurma = async (req, res) => {
    const codigoTurma = req.params.codigo;

    try {
        const turmaCadastrada = await Turma.findOne({ where: { codigo: codigoTurma } });

        if (turmaCadastrada) {
            const id = turmaCadastrada.id;

            if (req.body.id) {
                delete req.body.id;
            }

            const [numRowsUpdate] = await Turma.update(req.body, { where: { id: id } });

            if (numRowsUpdate > 0) {
                const turmaAtualizada = await Turma.findOne({ where: { id: id } });
                return res.send({ message: 'Turma atualizada com sucesso', turmacomdadosnovos: turmaAtualizada });
            } else {
                return res.send('Erro ao atualizar dados, novos dados não encontrados...');
            }
        } else {
            return res.status(400).send('Turma não encontrada...');
        }
    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};
