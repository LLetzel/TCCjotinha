const { password, database, host, port, dialect, logging } = require('./dbConfig.json');

module.exports = {
  development: {
    username: process.env.DB_USER || 'root', // usuário do banco de dados
    password, // senha do banco de dados
    database, // nome do banco de dados
    host, // endereço do servidor
    port, // porta do servidor
    dialect, // tipo de banco de dados (MySQL, PostgreSQL, etc.)
    logging, // desativa ou ativa logs do Sequelize
  },
};