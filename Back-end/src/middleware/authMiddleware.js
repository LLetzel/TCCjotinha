const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, "letzellindao");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

module.exports = authMiddleware;
