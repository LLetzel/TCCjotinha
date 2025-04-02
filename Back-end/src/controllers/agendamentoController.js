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
        const { id_usuario, id_carro, interesse_id, data, hora, observacoes, status_id } = req.body;
        
        // Validação dos campos obrigatórios
        if (!id_usuario || !id_carro || !interesse_id || !data || !hora || !observacoes || !status_id) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        // Validação do formato da hora (hh:mm)
        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!horaRegex.test(hora)) {
            return res.status(400).json({ message: 'Formato de hora inválido. Use HH:mm' });
        }

        // Verificando se os IDs existem
        const userExists = await checkIfExists('id', User, id_usuario);
        const carExists = await checkIfExists('id', Cars, id_carro);
        const statusExists = await checkIfExists('id', statusCarros, status_id);
        const interesseExists = await checkIfExists('id', Interesse, interesse_id);

        if (!userExists || !carExists || !statusExists || !interesseExists) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        // Criando o agendamento
        const create = await Agendamento.create({ id_usuario, id_carro, interesse_id, data, hora, observacoes, status_id });
        return res.status(201).json({ message: 'Agendamento criado com sucesso!', data: create });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
};

// Função para atualizar agendamentos (PATCH)
exports.patchAgendamentos = async (req, res) => {
    try {
        const { id_agendamento, data, hora, interesse_id } = req.body;

        if (!data && !hora && !interesse_id) {
            return res.status(400).json({ message: 'Preencha pelo menos um campo para atualizar' });
        }

        if (hora) {
            // Validação do formato da hora (hh:mm)
            const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            if (!horaRegex.test(hora)) {
                return res.status(400).json({ message: 'Formato de hora inválido. Use HH:mm' });
            }
        }

        if (interesse_id) {
            const interesseExists = await checkIfExists('id', Interesse, interesse_id);
            if (!interesseExists) return res.status(400).json({ message: 'Interesse inválido' });
        }

        const agendamento = await Agendamento.findByPk(id_agendamento);
        if (!agendamento) {
            return res.status(400).json({ message: 'Agendamento não encontrado' });
        }

        await Agendamento.update(
            { ...(data && { data }), ...(hora && { hora }), ...(interesse_id && { interesse_id }) },
            { where: { id: id_agendamento } }
        );

        return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
    }
};

// Função para deletar agendamentos (DELETE)
exports.deleteAgendamentos = async (req, res) => {
    try {
        const { id_agendamento } = req.params;

        if (!id_agendamento) {
            return res.status(400).json({ message: 'ID do agendamento é obrigatório' });
        }

        const agendamento = await Agendamento.findByPk(id_agendamento);
        if (!agendamento) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        await agendamento.destroy();
        return res.status(200).json({ message: 'Agendamento deletado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar agendamento', error });
    }
};
