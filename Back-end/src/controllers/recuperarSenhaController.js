const { sendPasswordResetEmail } = require('../services/emailServices');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { gerarToken, validarToken, consumirToken } = require('../services/tokenServices');

exports.enviarEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const token = gerarToken(email);

    const API_BASE_URL = process.env.FRONTEND_URL;
    const link = `${API_BASE_URL}/recuperarsenha?token=${token}`;
    // const link = `http://localhost:3000/recuperarsenha?token=${token}`;
    await sendPasswordResetEmail(email, link);

    res.json({ mensagem: 'Link de redefinição enviado para o e-mail.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao processar solicitação.' });
  }
};

exports.redefinirSenha = async (req, res) => {
  const { token, novaSenha } = req.body;
  const email = validarToken(token);
  if (!email) {
    return res.status(400).json({ mensagem: 'Token inválido ou expirado.' });
  }

  try {
    const hashSenha = await bcrypt.hash(novaSenha, 10);
    await User.update(
      { senha: hashSenha },
      { where: { email } }
    );
    consumirToken(token);
    res.json({ mensagem: 'Senha redefinida com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao redefinir senha.' });
  }
};