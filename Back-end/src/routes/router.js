// routes/router.js
// Neste arquivo estão definidas todas as rotas do projeto.
// Em projetos com muitas rotas, é possível dividir as rotas em vários arquivos.

// Importações de módulos
const express = require('express');
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../middleware/authMiddleware.js');
const checkPermissions = require('../middleware/checkPermissionsMiddleware.js')
const authController = require('../controllers/auth.js')
const carsController = require('../controllers/carsController.js')
const upload = require('../utils/multer.js');

// usuário
router.post('/cadastro', authController.register);
router.post('/login', authController.login);
router.get('/usuario/:id', authController.mostrarUser );
router.get('/usuarios', authController.mostrarUsers);
router.delete('/deletarUsuario/:id', authController.deleteUser);
router.put('/atualizarUsuario/:id', authController.updateUsers);


// carros
router.post('/RegistroCarro',
    upload.fields([
        { name: 'imagem1', maxCount: 1 },
        { name: 'imagem2', maxCount: 1 },
        { name: 'imagem3', maxCount: 1 },
        { name: 'imagem4', maxCount: 1 },
        { name: 'imagem5', maxCount: 1 }
    ]), 
    carsController.createCar
);
router.delete('/DeletarCarro/:id', isAuthenticated, carsController.deleteCar);
router.put('/AtualizarCarro/:id', isAuthenticated, carsController.atualizarCar);
router.get('/Carros', carsController.mostrarCarros);
router.get('/Carro/:id', carsController.mostrarCarro);


// Destaques
router.get('/mostrarDestaques', carsController.MostrarDestaques);
router.post(`/adicionarDestaque`, carsController.AdicionarDestaques);
router.delete(`/removerDestaque/:id`, carsController.DeletarDestaque);


// agendamento




module.exports = router;