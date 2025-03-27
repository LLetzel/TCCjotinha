// routes/router.js
// Neste arquivo estão definidas todas as rotas do projeto.
// Em projetos com muitas rotas, é possível dividir as rotas em vários arquivos.

// Importações de módulos
const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require("../controllers/auth.js");
const carsController = require("../controllers/carsController.js");
const upload = require("../utils/multer.js");
const nodemailer = require("nodemailer");
const agendamentoController = require("../controllers/agendamentoController");
require("dotenv").config({ path: "../.env" });

// pages
router.use(express.static(path.join(__dirname, "../../../Front-end")));

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../Front-end/src/login/login.html"));
});

router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../Front-end/src/home/home.html"));
});

router.get("/carsAdm", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/admin/cars/cars.html")
  );
});

router.get("/dashboardAdm", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../../Front-end/src/admin/dashboard/dashboard.html"
    )
  );
});

router.get("/userAdm", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/admin/user/user.html")
  );
});

router.get("/agendamento", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/agendamento/agendamento.html")
  );
});

router.get("/cadastro", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/cadastro/cadastro.html")
  );
});
router.get("/cadastro2", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Front-end/src/cadastro/cadastro2.html"));
});

router.get("/cardetails", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/cardetails/cardetails.html")
  );
});

router.get("/consignar", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/consignar/consignar.html")
  );
});

router.get("/contato", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/contato/contato.html")
  );
});

router.get("/estoque", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/estoque/estoque.html")
  );
});

router.get("/perfil", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/perfil/perfil.html")
  );
});

router.get("/sobrenos", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../Front-end/src/sobrenos/sobrenos.html")
  );
});

// usuário
router.post("/cadastro", authController.register);
router.post("/login", authController.login);
router.get("/usuario/:id", authController.mostrarUser);
router.get("/usuarios", authController.mostrarUsers);
router.delete("/deletarUsuario/:id", authController.deleteUser);
router.put("/atualizarUsuario/:id", authController.updateUsers);

// carros
router.post(
  "/RegistroCarro",
  upload.fields([
    { name: "imagem1", maxCount: 1 },
    { name: "imagem2", maxCount: 1 },
    { name: "imagem3", maxCount: 1 },
    { name: "imagem4", maxCount: 1 },
    { name: "imagem5", maxCount: 1 },
  ]),
  carsController.createCar
);
router.delete("/DeletarCarro/:id", carsController.deleteCar);
router.put("/AtualizarCarro/:id", carsController.atualizarCar);
router.get("/Carros", carsController.mostrarCarros);
router.get("/Carro/:id", carsController.mostrarCarro);

// Destaques
router.get("/mostrarDestaques", carsController.MostrarDestaques);
router.post(`/adicionarDestaque`, carsController.AdicionarDestaques);
router.delete(`/removerDestaque/:id`, carsController.DeletarDestaque);

// agendamento
router.get("/agendamento/get", agendamentoController.getAgendamentos); //  obter
router.post("/agendamento/post", agendamentoController.postAgendamentos); // postar
router.patch("/agendamento/patch", agendamentoController.patchAgendamentos); //atualizar
router.delete("/agendamento/delete", agendamentoController.deleteAgendamentos); //deletar

// contato
router.post("/contato", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !subject || !message) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
            `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ mensagem: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res
      .status(500)
      .json({ mensagem: "Não foi possível enviar o e-mail, tente novamente" });
  }
});

module.exports = router;
