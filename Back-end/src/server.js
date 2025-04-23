// Importando o módulo do express
const express = require('express');
const sequelize = require('./config/sequelize');
const router = require('./routes/router');
const cors = require('cors')
const session = require('express-session');
const { token } = require('./config.json')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');

// require('dotenv').config();

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida.');

        // Listando todas as tabelas do banco de dados
        return sequelize.query('SHOW TABLES');
    })
    .then(([result, metadata]) => {
        console.log('Tabelas no banco de dados:');
        console.log(result);
    })
    .catch(err => {
        console.error('Falha ao conectar ao banco de dados:', err);
    });

// Criando uma instância do express
const app = express();

app.use(express.static('../../../Front-end/'));

app.use(session({
    secret: token, // Substitua por uma chave secreta cors 
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        sameSite: "strict", // Protege contra CSRF
        httpOnly: true, // Impede o acesso ao cookie via JavaScript no cliente
        secure: process.env.NODE_ENV === 'production', // Somente envia cookies via HTTPS em produção
    } // O cookie vai expirar em 1 dia
}));


app.use(cors({
    origin: 'http://localhost:5500', // ou o domínio do seu frontend
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type']
     }))


app.use (cookieParser())

// Definindo o middleware para aceitar dados no formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Definindo a porta em que o servidor irá ouvir
const PORT = 3000;

// Iniciando o servidor e ouvindo a porta especificada
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado!\x1b[36;5;4mhttp://localhost:${PORT}\x1b[0m`);
});
