const Cars = require('../models/cars');
const {Op} = require('sequelize');

const {where} = require('sequelize');
const {response} = require('express');
const {spliceStr, singularize, removeTicks} = require('sequelize/lib/utils');
const statusCars = require('../models/statuscars')
const tipoCars = require('../models/tipocars')

exports.createCar = async (req, res) => {
    try {
        const {marca, modelo, ano, preco, quilometragem, combustivel, cambio, cor, ipva, descricao, imagem1, imagem2, imagem3, imagem4, imagem5} = req.body;

        if (!marca || !modelo || !ano || !preco || !quilometragem || combustivel || cambio || !cor || ipva || !descricao || !imagem1 || !imagem1 || !imagem2 || !imagem3 || !imagem4 || !imagem5) {
            return res.status(400).json({
                message: 'Preencha todos os campos'});
        }

        const car = await Cars.create({
            placa,
            modelo,
            ano,
            cor,
            status,
            tipo
        });

        return res.status(201).json({car});
    } catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor'
        });
    }
    }

exports.mostrarCars = async (req, res) => {
    try {
        const cars = await Cars.findAll({
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

        return res.status(200).json({cars});
    } catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor'
        });
    }
}

exports.mostrarCar = async (req, res) => {
    try {
        const {id} = req.params;

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

        return res.status(200).json({car});
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
        const {id} = req.params;
        const car = await Cars.destroy({where: {id}});
        if (!car) {
            return res.status(404).json({
                message: 'Carro não encontrado'
                });
                }
                return res.status(200).json({message: 'Carro deletado com sucesso'});
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
        const {id} = req.params;
        const {marca, modelo, ano, preco, quilometragem, combustivel, cambio, cor, ipva, descricao, imagem1, imagem2, imagem3, imagem4, imagem5} = req.body;
        const car = await Cars.update({marca, modelo, ano, preco, quilometragem, combustivel, cambio, cor, ipva, descricao, imagem1, imagem2, imagem3, imagem4, imagem5}, {where: {id}});
        if (!car) {
            return res.status(404).json({
                message: 'Carro não encontrado'
            });
        }
        return res.status(200).json({message: 'Carro atualizado com sucesso'});
    }
    catch (err) {
        console.error('Error no servidor:' + err);
        return res.status(500).json({
            success: false,
            response: 'Erro interno no servidor'
        });
    }
}