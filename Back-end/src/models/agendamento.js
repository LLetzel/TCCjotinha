const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize'); // Certifique-se de que este arquivo aponta corretamente para sua conexão com o banco

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Nome da tabela referenciada
            key: 'id'
        }
    },
    id_carro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'carros',
            key: 'id'
        }
    },
    data_hora: {
        type: Sequelize.DATE,
        allowNull: false
    },
    interesse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'interesses_agendamentos',
            key: 'id'
        }
    },
    observacoes: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'status_carros',
            key: 'id'
        }
    }
}, {
    tableName: 'agendamentos',
    timestamps: false 
});

module.exports = Agendamento;
