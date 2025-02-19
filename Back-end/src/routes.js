const express = require("express");
const path = require("path");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });


// Rota para exibir a página de perfil
router.get("/perfil", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/perfil/perfil.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/home/home.html"));
});


// Rota para exibir a página de contato
router.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/contato/contato.html")
    );
});

router.get("/agendamento", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/agendamento/agendamento.html")
    );
});

router.get("/cardetails", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/cardetails/cardetails.html")
    );
});

router.get("/consignar", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/consignar/consignar.html")
    );
});

router.get("/estoque", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/estoque/estoque.html")
    );
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/login/login.html")
    );
});

router.get("/perfil", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/perfil/perfil.html")
    );
});

router.get("/sobrenos", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/sobrenos/sobrenos.html")
    );
});

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
