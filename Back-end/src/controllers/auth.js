//Importar os módulos necessários
const User = require("../models/user.js");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken'); // Importe a biblioteca jwt
const { where } = require("sequelize");
const { response } = require("express");
const { spliceStr, singularize, removeTicks } = require("sequelize/lib/utils");
const { verifyEncrypt, encrypting } = require("../utils/encrypt.js");
const Role = require("../models/role.js");
const session = require("express-session");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não cadastrado" });
    }

    //Verificar a senha

    const passwordMatch = await verifyEncrypt(senha, user.senha);


    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        response: "Usuário ou senha incorretos",
      });
    }

    req.session.regenerate((err) => {
      if (err) {
        console.error("Erro ao regenerar sessão:", err);
        return res.status(500).send("Erro interno do servidor", err);
      }
    });

    req.session.user = {
      id: user.id,
    };

    req.session.role = {
      tipo_id: user.tipo_id,
    };

    return res.status(200).json({
      success: true,
      response: "Login bem-sucedido!",
      user: req.session.user,
    });


  } catch (err) {
    console.error("Error no servidor:" + err);
    return res.status(500).json({
      success: false,
      response: "Erro interno do servidor",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { nome, nascimento, cpf, sexo, confirmPassword, email } = req.body;
    let { senha } = req.body;

    if (
      !nome ||
      !nascimento ||
      !cpf ||
      !sexo ||
      !senha ||
      !confirmPassword ||
      !email
    ) {
      return res.status(401).json({
        success: false,
        response: "Preencha todos os campos",
      });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ cpf: cpf }, { email: email }],
      },
    });

    if (user) {
      return res.status(401).json({
        success: false,
        response: "Usuário já está cadastrado",
      });
    }

    if (senha !== confirmPassword) {
      return res.status(401).json({
        success: false,
        response: "As senhas são divergentes",
      });
    }

    const hashedPassword = await encrypting(senha);

    if (!hashedPassword) {
      return res.status(401).json({
        success: false,
        response: "Erro ao criar senha criptografada",
      });
    }

    senha = hashedPassword;

    const role = await Role.findOne({ where: { tipo: "Cliente" } });

    if (!role) {
      return res.status(500).json({
        success: false,
        response: "Erro interno do servidor, cargo não encontrado",
      });
    }

    const tipo_id = role.id;

    const cadastrar = await User.create({
      nome,
      nascimento,
      cpf,
      sexo,
      senha,
      email,
      tipo_id,
    });

    if (!cadastrar) {
      return res.status(400).json({
        success: false,
        response: "Erro ao cadastrar",
      });
    }

    return res.status(200).json({
      success: true,
      response: "Sucesso ao cadastrar",
    });
  } catch (err) {
    console.error("Error no servidor:" + err);
    return res.status(500).json({
      success: false,
      response: "Erro interno no servidor",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        response: "Usuário não encontrado",
      });
    }
    await user.destroy();
    return res.status(200).json({
      success: true,
      response: "Usuário deletado com sucesso",
    });
  } catch (err) {
    console.error("Error no servidor:" + err);
    return res.status(500).json({
      success: false,
      response: "Erro interno no servidor",
    });
  }
}


exports.mostrarUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        response: "Usuário não encontrado",
      });
    }
    return res.status(200).json({
      success: true,
      response: user,
    });
  } catch (err) {
    console.error("Error no servidor:" + err);
    return res.status(500).json({
      success: false,
      response: "Erro interno no servidor",
    });
  }
}


exports.mostrarUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({
        success: false,
        response: "Usuários não encontrados",
      })
    }
    return res.status(200).json({
      success: true,
      response: users
    });
  } catch (err) {
    console.error("Error no servidor:" + err);
    return res.status(500).json({
      success: false,
      response: "Erro interno no servidor",
    })
  }
}


exports.updateUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        response: "Usuário não encontrado",
      });
    }

    console.log(user);

    const tipo_id = req.body;
    const userUpdated = await user.update(tipo_id);
    return res.status(200).json({
      success: true,
      response: userUpdated
    });
  } catch (error) {
    alert(error.message);
  }
}

exports.infoPerfil = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(userId);

    if (!userId) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }

    const sql = "SELECT nome, email, cpf, nascimento, telefone FROM usuarios WHERE id = ?";
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
};


exports.atualizarUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, senha, cpf, nascimento, sexo } = req.body;
    const user = await User.update({ nome, email, telefone, senha, cpf, nascimento, sexo }, { where: { id } });
    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado'
      });
    }
    return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  }
  catch (err) {
    console.error('Error no servidor:' + err);
    return res.status(500).json({
      success: false,
      response: 'Erro interno no servidor'
    });
  }
}


exports.alterarSenha = async (req, res) => {
  try {
    const id = req.params.id;
    const { senhaAtual, senha } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        response: "Usuário não encontrado",
      });
    }

    // Verifica se a senha atual está correta
    const isMatch = await bcrypt.compare(senhaAtual, user.senha);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        response: "Senha atual incorreta",
      });
    }

    // Criptografa a nova senha
    const hashedPassword = await encrypting(senha);
    const userUpdated = await user.update({ senha: hashedPassword });

    return res.status(200).json({
      success: true,
      response: userUpdated,
    });
  } catch (error) {
    console.error("Error no servidor:" + error);
    return res.status(500).json({
      success: false,
      response: "Erro no servidor",
    });
  }
}

exports.consignar = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Preparar os anexos com base nos arquivos enviados via multer
    const attachments = req.files && req.files.fotos ? req.files.fotos.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype
    })) : [];

    const userName = req.body.userName || "Não informado";
    const userEmail = req.body.userEmail || "Não informado";
    const userTelefone = req.body.userTelefone || "Não informado";
    const userCPF = req.body.userCPF || "Não informado";


    const mailOptions = {
      from: `"Jotinha veiculos" <${process.env.EMAIL_USER}>`,
      to: "gabrielledelimaq@gmail.com",
      subject: "Nova mensagem de contato: proposta de consignação",
      html: `
                <h2>Nova mensagem de consignação</h2>
                <p><strong>Nome do Usuário:</strong> ${userName}</p>
                <p><strong>Email do Usuário:</strong> ${userEmail}</p>
                <p><strong>Telefone do Usuário:</strong> ${userTelefone}</p>
                <p><strong>CPF do Usuário:</strong> ${userCPF}</p>
                <p><strong>Marca:</strong> ${req.body.marca}</p>
                <p><strong>Modelo:</strong> ${req.body.modelo}</p>
                <p><strong>Ano:</strong> ${req.body.ano}</p>
                <p><strong>Quilometragem:</strong> ${req.body.quilometragem}</p>
                <p><strong>fipeResult:</strong> ${req.body.fipeResult}</p>
                <p><strong>Preço:</strong> ${req.body.preco}</p>
                <p><strong>Estado do veículo:</strong> ${req.body.rating}</p>
                <p><strong>Observações:</strong> ${req.body.observacoes}</p>
                <p><strong>Fotos enviadas:</strong> ${attachments.length > 0 ? attachments.map(att => att.filename).join(", ") : "Nenhuma"}</p>
            `,
      attachments: attachments  // Inclua os arquivos como anexos
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ message: "Não foi possível enviar o e-mail, tente novamente" });
  }
};