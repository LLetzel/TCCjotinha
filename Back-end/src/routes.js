// // Importando os módulos necessários
// const express = require('express');
// const axios = require('axios');
// const path = require('path');
// const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');

// const UserController = require('./controllers/UserController');

// const Router = express.Router();

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // // Rota para a página de login
// // app.get('/login', (req, res) => {
// //     res.sendFile(__dirname + '/login.html');
// //     res.clearCookie('authenticated');
// // });

// // // Rota para a página de cadastro
// // app.get('/cadastro', (req, res) => {
// //     res.sendFile(__dirname + '/cadastro.html');
// //     res.clearCookie('authenticated');
// // });


// module.exports = router;

const express = require('express');
const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
const app = express();
const PORT = 3000;

app.use(router);

router.get('/usuarios', (req, res) => {
    res.send('Chegou aqui! Estamos listando todos os usuários');
});

router.post('/usuarios', (req, res) => {
    res.send('Chegou aqui! Estamos criando um novo usuário');
});

router.put('/usuario/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Chegou aqui! Estamos atualizando o usuário com id: ${id}`);
});

router.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Chegou aqui! Estamos deletando o usuário com id: ${id}`);
});

module.exports = router; // Exporta o módulo router para ser utilizado em outros arquivos
