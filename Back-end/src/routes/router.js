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
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const timestamp = Date.now();
        cb(null, `${name}-${timestamp}${ext}`); // nome do arquivo salvo
    },
});

const upload = multer({ storage });

// usuário
router.post('/cadastro', authController.register);
router.post('/login', authController.login);
router.get('/usuario/:id', authController.mostrarUser);
router.get('/usuarios', authController.mostrarUsers);
router.get('/infoPerfil/:userId', authController.infoPerfil);
router.put('/telefone/:id', authController.atualizarUser);
router.post(
    '/consignar/:id',
    upload.fields([{ name: 'fotos', maxCount: 5 }]),
    authController.consignar
);

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

        // Configuração do transporte de e-mail (usando variáveis de ambiente)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Definido no .env
                pass: process.env.EMAIL_PASS // App Password do Gmail

            }
        });

        console.log(__dirname)
        const templatePath = path.join("./email", 'emailContato.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        htmlTemplate = htmlTemplate
            .replace('{{name}}', name)
            .replace('{{email}}', email)
            .replace('{{phone}}', phone)
            .replace('{{subject}}', subject)
            .replace('{{message}}', message);


        // Configuração do e-mail
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: "gabrielledelimaq@gmail.com",
            subject: `Nova mensagem de contato: ${subject}`,
            html: htmlTemplate,
            attachments: [
                {
                  filename: 'logo.png',
                  path: path.join(__dirname, '../../../Front-end/img/logo.png'),
                  cid: 'logo'
                }
              ]
        };

        // Enviar o e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ mensagem: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ mensagem: "Não foi possível enviar o e-mail, tente novamente" });
    }
});


//-------------------------------------------------------------//


router.use(express.static(path.join(__dirname, "../../../Front-end")));


router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/login/login.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/home/home.html"));
});

router.get("/cars", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/admin/cars/cars.html"));
});

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/admin/dashboard/dashboard.html"));
});

router.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/admin/user/user.html"));
});

router.get("/agendamento", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/agendamento/agendamento.html"));
});

router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/cadastro/cadastro.html"));
});

router.get("/cardetails", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/cardetails/cardetails.html"));
});

router.get("/consignar", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/consignar/consignar.html"));
});

router.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/contato/contato.html"));
});

router.get("/estoque", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/estoque/estoque.html"));
});

router.get("/perfil", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/perfil/perfil.html"));
});


router.get("/sobrenos", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/sobrenos/sobrenos.html"));
});



module.exports = router;