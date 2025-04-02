const Cars = require('../models/cars');
const { Op } = require('sequelize');

const { where } = require('sequelize');
const { response } = require('express');
const { spliceStr, singularize, removeTicks } = require('sequelize/lib/utils');
const statusCarros = require('../models/statuscars');
const tipos_carros = require('../models/tipocars');
const CarrosDestaques = require('../models/destaques')

exports.createCar = async (req, res) => {
    try {
        const carData = { marca, modelo, ano, preco, quilometragem, combustivel, cambio, cor, ipva, descricao, imagem1, imagem2, imagem3, imagem4, imagem5, status_id, tipo_id } = req.body;

        if (!marca || !modelo || !ano || !preco || !combustivel || !cambio || !cor || !ipva || !descricao || !status_id || !tipo_id) {
            return res.status(400).json({
                message: 'Preencha todos os campos'
            });
        }


        // Processar caminhos das imagens
        if (req.files) {
            for (let i = 1; i <= 5; i++) {
                if (req.files[`imagem${i}`]) {
                    carData[`imagem${i}`] = `/src/imgcarros/${req.files[`imagem${i}`][0].filename}`;
                }
            }
        }

        const car = await Cars.create(carData);

        return res.status(201).json({ car });
    } catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor'
        });
    }
}

exports.mostrarCarros = async (req, res) => {
    try {
        const cars = await Cars.findAll({
            include: [
                {
                    model: statusCarros,
                    as: 'status'
                },
                {
                    model: tipos_carros,
                    as: 'tipo'
                },
                // {
                //     model: CarrosDestaques,
                //     as: 'id_carro'
                // }
            ]
        });

        return res.status(200).json({ cars });
    } catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor',
        });
    }
}

exports.mostrarCarro = async (req, res) => {
    try {
        const id = req.params.id;

        const car = await Cars.findByPk(id, {
            include: [
                {
                    model: statusCars,
                    as: 'status'
                },
                {
                    model: tipoCars,
                    as: 'tipo'
                }
            ]
        });

        if (!car) {
            return res.status(404).json({
                message: 'Carro não encontrado'
            });
        }

        return res.status(200).json({ car });
    } catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor'
        });
    }
}

exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Cars.destroy({ where: { id } });
        if (!car) {
            return res.status(404).json({
                message: 'Carro não encontrado'
            });
        }
        return res.status(200).json({ message: 'Carro deletado com sucesso' });
    } catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor'
        });
    }
}

exports.atualizarCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, ano, preco, quilometragem, combustivel, cambio, cor, ipva, descricao, imagem1, imagem2, imagem3, imagem4, imagem5 } = req.body;
        const car = await Cars.update({ marca, modelo, ano, preco, quilometragem, combustivel, cambio, cor, ipva, descricao, imagem1, imagem2, imagem3, imagem4, imagem5 }, { where: { id } });
        if (!car) {
            return res.status(404).json({
                message: 'Carro não encontrado'
            });
        }
        return res.status(200).json({ message: 'Carro atualizado com sucesso' });
    }
    catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor'
        });
    }
}


exports.MostrarDestaques = async (req, res) => {
    try {
        const cars = await CarrosDestaques.findAll();
        return res.status(200).json(cars);
    }
    catch (err) {
        console.error('Error no servidor:' + err);
    }

};

// Função para adicionar carro em destaque (limite de 3 carros)
exports.AdicionarDestaques = async (req, res) => {
    try {
        const {id_carro} = req.body;

        // Verifica quantos destaques já existem
        const countDestaques = await CarrosDestaques.count();
        if (countDestaques >= 3) {
            return res.status(400).send("Limite de 3 carros em destaque atingido.");
        }

        // Verifica se o carro já está em destaque
        const carroExistente = await CarrosDestaques.findOne({ where: { id_carro } });
        if (carroExistente) {
            return res.status(400).send("Este carro já está em destaque.");
        }

        // Adiciona o carro em destaque
        await CarrosDestaques.create({ id_carro});
        return res.status(200).send("Carro adicionado aos destaques com sucesso.");
    } catch (err) {
        return res.status(500).send("Erro ao adicionar destaque: " + err);
    }
};

exports.DeletarDestaque = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await CarrosDestaques.destroy({ where: { id } });
        if (!car) {
            return res.status(404).send('Destaque não encontrado')
            ;
        }
        return res.status(200).send('Sucesso ao excluir destaque')
    }
    catch (err) {
        return res.status(500).send(err)
    }
}

