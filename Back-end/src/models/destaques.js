const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Interesse = sequelize.define('interesses_agendamentos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },

    interesse: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    }
}, {
    timestamps: false, 
    freezeTableName: true,
});

module.exports = Interesse;
