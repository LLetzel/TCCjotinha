const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const { SELECT } = require('sequelize/lib/query-types');

const User = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: Sequelize.STRING(20),
        allowNull: true,
    },
    senha: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
    },
    nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    sexo: {
        type: Sequelize.ENUM('Masculino', 'Feminino'),
        allowNull: false 
    }
}, {
    timestamps: false,
    freezeTableName: true, 
});

module.exports = User;