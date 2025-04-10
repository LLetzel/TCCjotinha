const { username, password, database, host, port, dialect, logging } = require('./dbConfig.json');

module.exports = {
  development: {
    username, // usuário do banco de dados
    password, // senha do banco de dados
    database, // nome do banco de dados
    host, // endereço do servidor
    port, // porta do servidor
    dialect, // tipo de banco de dados (MySQL, PostgreSQL, etc.)
    logging, // desativa ou ativa logs do Sequelize
  },
};
