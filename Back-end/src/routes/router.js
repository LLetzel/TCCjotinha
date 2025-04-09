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
router.get('/usuario/:id', authController.mostrarUser);
router.get('/usuarios', authController.mostrarUsers);
router.get('/infoPerfil/:userId', authController.infoPerfil);
router.put('/telefone/:id', authController.atualizarUser);

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


//-----------------------PESSOAL notificações-----------------------//


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

//------------------------------PESSOAL senha--------------------------------//

// router.put("/perfil/alterar-senha/:id", async (req, res) => {
//     const { senha } = req.body; // Pegando o telefone do corpo da requisição
//     // const userId = req.session.userId; 
//     const userId = req.params.id;// Pegando o ID do usuário autenticado na sessão

//     // Verificar se o telefone foi enviado
//     if (!senha) {
//         return res.status(400).json({ mensagem: "A senha não pode estar vazio." });
//     }

//     // Verificar se o usuário está autenticado
//     if (!userId) {
//         return res.status(401).json({ mensagem: "Usuário não autenticado." });
//     }

//     const sql = "UPDATE usuarios SET senha = ? WHERE id = ?";

//     try {
//         // Usando o promisePool para executar a consulta
//         const [result] = await promisePool.query(sql, [senha, userId]);

//         // Verificando se a atualização foi bem-sucedida
//         if (result.affectedRows > 0) {
//             res.json({ mensagem: "Senha atualizada com sucesso!" });
//         } else {
//             res.status(404).json({ mensagem: "Usuário não encontrado." });
//         }
//     } catch (err) {
//         console.error("Erro ao atualizar senha:", err);
//         res.status(500).json({ mensagem: "Erro ao atualizar senha." });
//     }
// });

module.exports = router;