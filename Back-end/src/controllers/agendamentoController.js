// Importação de módulos necessários
const { where } = require('sequelize');  // Importa a função 'where' do Sequelize para utilizar em consultas
const Agendamento = require('../models/agendamento.js');  // Modelo do Agendamento
const Cars = require('../models/cars.js');  // Modelo de Carros
const statusCarros = require('../models/statuscars.js');  // Modelo de Status de Carros
const { any } = require('../utils/multer.js');  // Função 'any' (provavelmente para upload de arquivos, mas não usada aqui)
const User = require('../models/user.js');  // Modelo de Usuários
const { response } = require('express');  // Express para lidar com respostas HTTP
const Interesse = require('../models/destaques.js');  // Modelo de Interesse (provavelmente relacionado a agendamentos)

// Função para verificar se um registro existe em uma tabela
async function checkIfExists(column, table, info) {
    // Realiza uma busca na tabela especificada, procurando pelo valor informado no 'column'
    const searchResult = await table.findOne({ where: { [column]: info } });

    // Se o resultado for encontrado, retorna o ID do registro
    if (searchResult !== null) {
        return searchResult.id;
    }

    // Se não encontrar o registro, retorna null
    return null;
}

// Função para obter agendamentos (GET)
exports.getAgendamentos = async (req, res) => {
    try {
        // Tenta buscar todos os agendamentos no banco de dados
        const agendamentos = await Agendamento.findAll();
        
        // Verifica se algum agendamento foi encontrado
        if (!agendamentos || agendamentos.length === 0) {
            // Se não houver agendamentos, retorna uma resposta com status 404 (não encontrado)
            return res.status(404).json({ message: 'Nenhum agendamento encontrado' });
        }
        
        // Se houver agendamentos, retorna uma resposta com status 200 (sucesso) e os agendamentos encontrados
        return res.status(200).json(agendamentos);
    } catch (err) {
        // Se ocorrer algum erro durante a busca, retorna uma resposta com status 500 (erro interno do servidor)
        return res.status(500).json({ message: 'Erro ao buscar agendamentos', error: err });
    }
}

// Função para criar agendamentos (POST)
exports.postAgendamentos = async (req, res) => {
    try {
        // Extrai os dados do corpo da requisição (do cliente)
        const { id_usuario, id_carro, interesse_id, data_hora, observacoes, status_id } = req.body;

        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!id_usuario || !id_carro || !interesse_id || !data_hora || !observacoes || !status_id) {
            // Se faltar algum campo, retorna uma resposta com status 400 (bad request) indicando que todos os campos são necessários
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        // Busca o usuário pelo ID
        const userId = await User.findOne({ where: { id: id_usuario } });
        
        // Verifica se o usuário existe
        if (!userId) return res.status(400).json({ message: 'Usuário não encontrado' });
        
        // Busca o carro pelo ID
        const carId = await Cars.findOne({ where: { id: id_carro } });
        
        // Verifica se o carro existe
        if (!carId) return res.status(400).json({ message: 'Carro não encontrado' });
        
        // Busca o status pelo ID
        const statusId = await statusCarros.findOne({ where: { id: status_id } });
        
        // Verifica se o status existe
        if (!statusId) return res.status(400).json({ message: 'Status inválido' });
        
        // Busca o interesse pelo ID
        const interesseId = await Interesse.findOne({ where: { id: interesse_id } });
        
        // Verifica se o interesse existe
        if (!interesseId) return res.status(400).json({ message: 'Interesse inválido' });

        // Cria um novo agendamento no banco de dados com os dados fornecidos
        const create = await Agendamento.create(req.body);

        // Se o agendamento for criado com sucesso, retorna uma resposta com status 201 (criado) e os dados do agendamento
        return res.status(201).json({ message: 'Agendamento criado com sucesso!', data: create });
    } catch (error) {
        // Se ocorrer algum erro, retorna uma resposta com status 500 (erro interno do servidor)
        return res.status(500).json({ message: 'Erro ao criar agendamento', error: error });
    }
}

// Função para atualizar agendamentos (PATCH)
exports.patchAgendamentos = async (req, res) => {
    try {
        // Extrai os dados do corpo da requisição (do cliente)
        const { id_agendamento, data_hora, interesse_id } = req.body;

        // Verifica se pelo menos um dos campos 'data_hora' ou 'interesse_id' foi preenchido
        if (!data_hora && !interesse_id) {
            // Se nenhum dos campos foi preenchido, retorna uma resposta com status 400 (bad request)
            return res.status(400).json({ message: 'Preencha datahora ou o interesse' });
        }

        // Verifica se o interesse existe (utiliza a função checkIfExists)
        const interesseExists = await checkIfExists('id', Interesse, interesse_id);
        if (!interesseExists) return res.status(400).json({ message: 'Interesse inválido' });

        // Busca o agendamento pelo ID fornecido
        const id = await Agendamento.findByPk(id_agendamento);

        // Verifica se o agendamento foi encontrado
        if (!id) {
            // Se o agendamento não for encontrado, retorna uma resposta com status 400 (bad request)
            return res.status(400).json({ message: 'Agendamento não encontrado' });
        }

        // Atualiza o agendamento no banco de dados com os novos valores fornecidos
        await Agendamento.update(
            { ...(data_hora && { data_hora }), ...(interesse_id && { interesse_id }) },
            { where: { id: id_agendamento } }
        );

        // Se a atualização for bem-sucedida, retorna uma resposta com status 200 (sucesso)
        return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' });
    } catch (error) {
        // Se ocorrer algum erro durante a atualização, retorna uma resposta com status 500 (erro interno do servidor)
        return res.status(500).json({ message: 'Erro ao atualizar agendamento', error: error });
    }
}
