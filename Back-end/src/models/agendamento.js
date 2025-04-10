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
    data: {
        type: Sequelize.STRING,
        allowNull: false
    },

    hora:{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    interesse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
    tableName: 'agendamentos',
    timestamps: false 
});

module.exports = Agendamento;
