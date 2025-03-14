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
