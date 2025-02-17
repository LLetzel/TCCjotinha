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

// const express = require('express');
// const { Router } = require('express');
// const { json } = require('express/lib/response');
// const router = Router();
// const app = express();
// const PORT = 3000;

// app.use(router);

// router.get('/usuarios', (req, res) => {
//     res.send('Chegou aqui! Estamos listando todos os usuários');
// });

// router.post('/usuarios', (req, res) => {
//     res.send('Chegou aqui! Estamos criando um novo usuário');
// });

// router.put('/usuario/:id', (req, res) => {
//     const { id } = req.params;
//     res.send(`Chegou aqui! Estamos atualizando o usuário com id: ${id}`);
// });

// router.delete('/usuario/:id', (req, res) => {
//     const { id } = req.params;
//     res.send(`Chegou aqui! Estamos deletando o usuário com id: ${id}`);
// });

// module.exports = router; // Exporta o módulo router para ser utilizado em outros arquivos


const express = require('express');
const router = express.Router();
const db = require('../src/config/database'); // Conexão com o MySQL

// Rota para buscar todos os carros
// Rota para buscar os detalhes de um carro pelo ID
router.get('/carros/:id', (req, res) => {
    const carId = req.params.id; // Pega o ID do carro da URL
    const sql = `
        SELECT 
            c.id, c.marca, c.modelo, c.ano, c.preco, c.quilometragem, 
            c.combustivel, c.cambio, c.cor, c.ipva, c.descricao, 
            c.imagem1, c.imagem2, c.imagem3, c.imagem4, c.imagem5, 
            s.status AS status, t.descricao AS tipo
        FROM carros c
        JOIN status_carros s ON c.status_id = s.id
        JOIN tipo_veiculo t ON c.tipo_id = t.id
        WHERE c.id = ?
    `;

    db.query(sql, [carId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }
        res.json(result[0]); // Retorna os detalhes do carro
    });
});

module.exports = router; // Exporta o módulo router para ser utilizado em outros arquivos