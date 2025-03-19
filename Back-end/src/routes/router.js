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
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });
const upload = require('../utils/multer.js');

// usuário
router.post('/cadastro', authController.register);
router.post('/login', authController.login);
router.get('/usuario/:id', authController.mostrarUser );
router.get('/usuarios', authController.mostrarUsers);


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


// agendamento

//contato
router.post("/contato", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        // console.log(req.body);
        // Validação dos campos obrigatórios
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }
        // console.log(process.env.EMAIL_PASS);
        // console.log(process.env.EMAIL_USER);

        // Configuração do transporte de e-mail (usando variáveis de ambiente)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Definido no .env
                pass: process.env.EMAIL_PASS // App Password do Gmail

            }
        });
        

        // Configuração do e-mail
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: "gabrielledelimaq@gmail.com",
            subject: `Nova mensagem de contato: ${subject}`,
            html: `
                <h2>Nova mensagem de contato</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Assunto:</strong> ${subject}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${message}</p>
            `
        };

        // Enviar o e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ mensagem: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ mensagem: "Não foi possível enviar o e-mail, tente novamente" });
    }
});


module.exports = router;