//Importar os módulos necessários
const User = require("../models/user.js");

const { where } = require("sequelize");
const { response } = require("express");
const { spliceStr } = require("sequelize/lib/utils");
// const { verifyEncrypt, encrypting } = require('../utils/encrypt.js');
// const session = require('express-session');

exports.auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não cadastrado" });
    }

    //Verificar a senha

    const passwordMatch = await verifyEncrypt(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        response: "Usuário ou senha incorretos",
      });
    }

    // req.session.user = {
    //     id: user.id,
    //     ramal: user.ramal,
    // };

    //Criptografia

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

exports.authCadastro = async (req, res) => {
  try {

    const { nome, nascimento, cpf, sexo, password } = req.body;

    if (!nome, !nascimento, !cpf, !sexo) {
        return res.status(401).json({
            success: false,
            response: 'Preencha todos os campos'
        })
    }

    const user = await User.findOne({ where: { cpf: cpf } });

    if(user){
        return res.status(401).json({
            success: false,
            response: 'Usuário já está cadastrado'
        })
    }

    const cadastrar = await User.create(req.body);

    if(!cadastrar){
        return res.status(400).json({
            success: false,
            response: 'Erro ao cadastrar'
        })
    }

    return res.status(200).json({
        success: true,
        response: 'Sucesso ao cadastrar'
    });

  } catch (err) {
    console.error("Error no servidor:" + err);
    return res.status(500).json({
      success: false,
      response: "Erro interno no servidor",
    });
  }
};
