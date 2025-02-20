const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const { SELECT } = require('sequelize/lib/query-types');

const Cars = sequelize.define('carros', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    marca: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    modelo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    quilometragem: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    combustivel: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    cambio: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    cor: {
        type: Sequelize.STRING(40),
        allowNull: false 
    },
    ipva: {
        type: Sequelize.STRING(40),
        allowNull: false 
    },
    descricao: {
        type: Sequelize.STRING(255),
        allowNull: false 
    },
    imagem1: {
        type: Sequelize.STRING(150),
        allowNull: false 
    },
    imagem2: {
        type: Sequelize.STRING(150),
        allowNull: false 
    },
    imagem3: {
        type: Sequelize.STRING(150),
        allowNull: false 
    },
    imagem4: {
        type: Sequelize.STRING(150),
        allowNull: false 
    },
    imagem5: {
        type: Sequelize.STRING(150),
        allowNull: false 
    },
    status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true, 
});

module.exports = Cars;