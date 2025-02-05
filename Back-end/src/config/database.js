require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'jotinhaveiculos',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
};