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
        const { id_usuario, id_carro, interesse_id, data_hora, observacoes, status_id } = req.body;
        if (!id_usuario || !id_carro || !interesse_id || !data_hora || !observacoes || !status_id) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }
        const userId = await User.findByPk(id_usuario);
        const carId = await Cars.findByPk(id_carro);
        const statusId = await statusCarros.findByPk(status_id);
        const interesseId = await Interesse.findByPk(interesse_id);
        if (!userId || !carId || !statusId || !interesseId) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }
        const create = await Agendamento.create(req.body);
        return res.status(201).json({ message: 'Agendamento criado com sucesso!', data: create });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
};

// Função para atualizar agendamentos (PATCH)
exports.patchAgendamentos = async (req, res) => {
    try {
        const { id_agendamento, data_hora, interesse_id } = req.body;
        if (!data_hora && !interesse_id) {
            return res.status(400).json({ message: 'Preencha datahora ou o interesse' });
        }
        const interesseExists = await checkIfExists('id', Interesse, interesse_id);
        if (!interesseExists) return res.status(400).json({ message: 'Interesse inválido' });
        const agendamento = await Agendamento.findByPk(id_agendamento);
        if (!agendamento) {
            return res.status(400).json({ message: 'Agendamento não encontrado' });
        }
        await Agendamento.update(
            { ...(data_hora && { data_hora }), ...(interesse_id && { interesse_id }) },
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
        // Extrai o id_agendamento da requisição (parâmetros de rota)
        const { id_agendamento } = req.params;

        // Verifica se o ID do agendamento foi informado
        if (!id_agendamento) {
            return res.status(400).json({ message: 'ID do agendamento é obrigatório' });
        }

        // Busca o agendamento pelo ID
        const agendamento = await Agendamento.findByPk(id_agendamento);

        // Verifica se o agendamento existe
        if (!agendamento) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        // Deleta o agendamento
        await agendamento.destroy();

        // Se a deleção for bem-sucedida, retorna uma resposta com status 200 (sucesso)
        return res.status(200).json({ message: 'Agendamento deletado com sucesso!' });
    } catch (error) {
        // Se ocorrer algum erro durante a deleção, retorna uma resposta com status 500 (erro interno do servidor)
        return res.status(500).json({ message: 'Erro ao deletar agendamento', error });
    }
};
