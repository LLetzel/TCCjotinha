const crypto = require('crypto');

const tokens = {};

function gerarToken(email) {
  const token = crypto.randomBytes(32).toString('hex');
  tokens[token] = {
    email,
    expires: Date.now() + 1000 * 60 * 60, // 1 hora
  };
  return token;
}

function validarToken(token) {
  const data = tokens[token];
  if (!data || data.expires < Date.now()) return null;
  return data.email;
}

function consumirToken(token) {
  delete tokens[token];
}

module.exports = { gerarToken, validarToken, consumirToken };