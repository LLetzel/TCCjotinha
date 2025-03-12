const express = require("express");
const path = require("path");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });
const promisePool = require('../src/config/database')
const jwt = require("jsonwebtoken");


// Rota para exibir a página de perfil
router.get("/perfil", autenticarToken, (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/perfil/perfil.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/home/home.html"));
});

router.get("/", (req, res) => {
    res.redirect("/home");
});


// Rota para exibir a página de contato
router.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/contato/contato.html")
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

router.get("/sobrenos", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-end/src/sobrenos/sobrenos.html")
    );
});



//-------------------------CONTATO--------------------------//
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


//-------------------------PERFIL (pessoal)--------------------------//


function autenticarToken(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado! Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, "seu_segredo_jwt"); // Substitua pelo seu segredo JWT
        req.userId = decoded.id; // Extraindo o ID do usuário do token
        next();
    } catch (err) {
        return res.status(403).json({ mensagem: "Token inválido ou expirado." });
    }
}

// busca o nome e o email do usuario
router.get("/perfil/:id",autenticarToken, async (req, res) => {
    try {
        const userId = req.params.id;

        console.log(userId)

        if (!userId) {
            return res.status(401).json({ mensagem: "Usuário não autenticado" });
        }

        const sql = "SELECT nome, email FROM usuarios WHERE id = ?";
        const [results] = await promisePool.execute(sql, [userId]);

        if (results.length > 0) {
            res.json(results[0]); // Retorna o usuário encontrado
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).json({ mensagem: "Erro ao buscar informações" });
    }
});


// Rota para obter o perfil do usuário autenticado
router.get("/perfil/inf/:id",autenticarToken, async (req, res) => {
    try {
        const userId = req.params.id;

        console.log(userId)

        if (!userId) {
            return res.status(401).json({ mensagem: "Usuário não autenticado" });
        }

        const sql = "SELECT nome, cpf, nascimento, telefone FROM usuarios WHERE id = ?";
        const [results] = await promisePool.execute(sql, [userId]);

        if (results.length > 0) {
            res.json(results[0]); // Retorna o usuário encontrado
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).json({ mensagem: "Erro ao buscar informações" });
    }
});



router.put("/perfil/telefone/:id", async (req, res) => {
    const { telefone } = req.body; // Pegando o telefone do corpo da requisição
    // const userId = req.session.userId; 
    const userId = req.params.id;// Pegando o ID do usuário autenticado na sessão

    // Verificar se o telefone foi enviado
    if (!telefone) {
        return res.status(400).json({ mensagem: "O telefone não pode estar vazio." });
    }

    // Verificar se o usuário está autenticado
    if (!userId) {
        return res.status(401).json({ mensagem: "Usuário não autenticado." });
    }

    const sql = "UPDATE usuarios SET telefone = ? WHERE id = ?";

    try {
        // Usando o promisePool para executar a consulta
        const [result] = await promisePool.query(sql, [telefone, userId]);

        // Verificando se a atualização foi bem-sucedida
        if (result.affectedRows > 0) {
            res.json({ mensagem: "Telefone atualizado com sucesso!" });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
    } catch (err) {
        console.error("Erro ao atualizar telefone:", err);
        res.status(500).json({ mensagem: "Erro ao atualizar telefone." });
    }
});

//-----------------------PESSOAL notificações-----------------------//

router.get("/perfil/email", autenticarToken, async (req, res) => {
    try {
        const userId = req.user.id; // Obtém o ID do usuário autenticado via JWT

        const sql = "SELECT email FROM usuarios WHERE id = ?";
        const [results] = await promisePool.execute(sql, [userId]);

        if (results.length > 0) {
            res.json({ email: results[0].email });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (err) {
        console.error("Erro ao buscar e-mail do usuário:", err);
        res.status(500).json({ mensagem: "Erro ao buscar e-mail" });
    }
});

//------------------------------PESSOAL senha--------------------------------//

router.put("/perfil/alterar-senha/:id", async (req, res) => {
    const { senha } = req.body; // Pegando o telefone do corpo da requisição
    // const userId = req.session.userId; 
    const userId = req.params.id;// Pegando o ID do usuário autenticado na sessão

    // Verificar se o telefone foi enviado
    if (!senha) {
        return res.status(400).json({ mensagem: "A senha não pode estar vazio." });
    }

    // Verificar se o usuário está autenticado
    if (!userId) {
        return res.status(401).json({ mensagem: "Usuário não autenticado." });
    }

    const sql = "UPDATE usuarios SET senha = ? WHERE id = ?";

    try {
        // Usando o promisePool para executar a consulta
        const [result] = await promisePool.query(sql, [senha, userId]);

        // Verificando se a atualização foi bem-sucedida
        if (result.affectedRows > 0) {
            res.json({ mensagem: "Senha atualizada com sucesso!" });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
    } catch (err) {
        console.error("Erro ao atualizar senha:", err);
        res.status(500).json({ mensagem: "Erro ao atualizar senha." });
    }
});


module.exports = router;
