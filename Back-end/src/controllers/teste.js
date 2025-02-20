// controllers/multer.js
const Turma = require('../models/turma');
const path = require('path');

exports.uploadFile = async (req, res) => {

    const textErros = {
        codigo: 'O código é obrigatório',
        descricao: 'A descrição é obrigatória',
        inicio: 'A data de início é obrigatória',
        fim: 'A data de fim é obrigatória'
    }

    try {
        const { codigo, descricao, inicio, fim } = req.body;

        const fileName = '/uploads/' + req.file.filename;

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
