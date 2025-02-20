const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const {
    SELECT
} = require('sequelize/lib/query-types');

const User = sequelize.define('users', {
   ramal: {
        type: Sequelize.INTEGER, // INT
        allowNull: false, // NOT NULL
        unique: true, // UNIQUE
        primaryKey: false
    },
    password: {
        type: Sequelize.STRING(120), // VARCHAR(120)
        allowNull: false, // NOT NULL
    },
    email: {
        type: Sequelize.STRING(65), // NVARCHAR(65)
        allowNull: false, // NOT NULL
    },
    data_cadastro: {
        type: Sequelize.DATE, // TIMESTAMP
        allowNull: false,
        defaultValue: Sequelize.NOW, // DEFAULT CURRENT_TIMESTAMP
    },
    role: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    timestamps: false, // Remove campos createdAt e updatedAt
    freezeTableName: true, // Usa o nome exato da tabela (não pluraliza)
    primaryKey: false
});

module.exports = User;