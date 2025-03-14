// Importação do módulo Sequelize
const Sequelize = require('sequelize');

// Importação do arquivo de configuração do banco de dados
const databaseConfig = require('./database/database');

// Inicialização de uma conexão com o banco de dados usando as configurações do arquivo database.js
const sequelize = new Sequelize(databaseConfig.development);

// Exportação do objeto de conexão com o banco de dados
module.exports = sequelize;