require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.DB_LOGGING === 'true',
  },
};
