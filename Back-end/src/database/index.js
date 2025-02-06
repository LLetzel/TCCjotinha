const Sequelize = require('sequelize');

const dbConfig = require("../config/database"); // importa as configurações do banco de dados jotinha veiculos

const connection = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {
        host: dbConfig.development.host,
        port: dbConfig.development.port,
        dialect: dbConfig.development.dialect,
        logging: dbConfig.development.logging
    }
); // cria a conexão com o banco de dados jotinha veiculos


try {
    connection.authenticate();
    console.log('Conexão com o banco de dados jotinha veiculos realizada com sucesso!');
} catch (error) {
    console.error('Erro ao conectar com o banco de dados jotinha veiculos:', error);
}

module.exports = connection; // exporta a conexão com o banco de dados jotinha veiculos