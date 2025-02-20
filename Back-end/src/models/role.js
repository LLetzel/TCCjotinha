const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Role = sequelize.define('tipos_usuarios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },

    tipo: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    },
}, {
    timestamps: false, // Remove campos createdAt e updatedAt
    freezeTableName: true, // Usa o nome exato da tabela (não pluraliza)
})

module.exports = Role;