// Importação de módulos necessários
const { where } = require('sequelize');
const Agendamento = require('../models/agendamento.js');
const Cars = require('../models/cars.js');
const statusCarros = require('../models/statuscars.js');
const { any } = require('../utils/multer.js');
const User = require('../models/user.js');
const { response } = require('express');
const Interesse = require('../models/destaques.js');

// Função para verificar se um registro existe em uma tabela
async function checkIfExists(column, table, info) {
    const searchResult = await table.findOne({ where: { [column]: info } });
    return searchResult ? searchResult.id : null;
}

// Função para obter agendamentos (GET)
exports.getAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll();
        if (!agendamentos.length) {
            return res.status(404).json({ message: 'Nenhum agendamento encontrado' });
        }
        return res.status(200).json(agendamentos);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar agendamentos', error: err });
    }
};

// Função para criar agendamentos (POST)
exports.postAgendamentos = async (req, res) => {    
    try {
        const { id_usuario, id_carro, interesse, data, hora, observacoes } = req.body;
        
        // Validação dos campos obrigatórios
        if (!id_usuario || !interesse || !data || !hora ) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        // Validação do formato da hora (hh:mm)
        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!horaRegex.test(hora)) {
            return res.status(400).json({ message: 'Formato de hora inválido. Use HH:mm' });
        }

        // Verificando se os IDs existem
        const userExists = await checkIfExists('id', User, id_usuario);

        if (!userExists) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        // Criando o agendamento
        const create = await Agendamento.create({ id_usuario, id_carro, interesse, data, hora, observacoes });
        return res.status(201).json({ message: 'Agendamento criado com sucesso!', data: create });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
};

