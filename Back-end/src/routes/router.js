// routes/router.js
// Neste arquivo estão definidas todas as rotas do projeto.
// Em projetos com muitas rotas, é possível dividir as rotas em vários arquivos.

// Importações de módulos
const express = require('express');
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../middleware/authMiddleware.js');
const checkPermissions = require('../middleware/checkPermissionsMiddleware.js')

// Importando controllers
// const usuarioController = require('../controllers/usuario');
const authController = require('./../controllers/auth.js')

router.post('/cadastro', authController.authCadastro);

// router.get('/login', authController.authLogin);

// router.get('/eventos/criar', isAuthenticated, checkPermissions('admin'), (req, res) => {

//     res.send('Acesso permitido! Você pode criar eventos.');
// });

// router.post('/cadastro', authController.authCadastro);



// Rota para servir a página HTML de upload
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../index.html'));
// });

// INSERIR OUTRAS ROTAS -->
/* router.get('/turmas', turmasController.getAll)
router.get('/turmas/:id', turmasCOntroller.getById) */

/* router.get('/turmas', turmasCOntroller.getAll)
router.get('/turmas/:id', turmasCOntroller.getById) */

/* router.get('/usuario', usuarioController.listarUsuarios) */

module.exports = router;
