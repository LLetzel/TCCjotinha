// Importando o módulo do express
const express = require('express');
const sequelize = require('./config/sequelize');
const router = require('./routes/router');
const cors = require('cors');
const session = require('express-session');
const { token } = require('./config.json');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida.');
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

// Serve arquivos estáticos do Front-end
app.use(express.static(path.join(__dirname, '../../../Front-end/')));

app.use(session({
    secret: token,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }
}));

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Defina seu domínio de frontend na variável de ambiente CORS_ORIGIN
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Definindo a porta em que o servidor irá ouvir
const PORT = process.env.PORT || 3000;

// Iniciando o servidor e ouvindo em todas as interfaces de rede (cloud ready)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Express iniciado! http://0.0.0.0:${PORT}`);
});
