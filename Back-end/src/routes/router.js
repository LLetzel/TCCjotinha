// routes/router.js
// Neste arquivo estão definidas todas as rotas do projeto.
// Em projetos com muitas rotas, é possível dividir as rotas em vários arquivos.

// Importações de módulos
const express = require('express');
const router = express.Router();
const path = require('path');
const isAuthenticated = require('../middleware/authMiddleware.js');
const checkPermissions = require('../middleware/checkPermissionsMiddleware.js')
const carsController = require('../controllers/carsController.js')
const authController = require('../controllers/auth.js')

router.post('/cadastro', authController.register);
router.post('/login', authController.login)
router.get('/teste', isAuthenticated, (req, res) => {
    res.send('Você está autenticado e tem permissão para acessar essa rota')}
)
    


// carros
router.post('/RegistroCarro', isAuthenticated, checkPermissions('Administrador'), carsController.createCar);
router.delete('/Carros/:id', isAuthenticated, checkPermissions('Administrador'), carsController.deleteCar);
router.put('/Carros/:id', isAuthenticated, checkPermissions('Administrador'), carsController.atualizarCar);
router.get('/Carros', isAuthenticated, carsController.mostrarCars);
router.get('/Carros/:id', isAuthenticated, carsController.mostrarCar); 




module.exports = router;