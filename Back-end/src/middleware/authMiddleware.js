const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      
      return next();
    }
    
    return res.status(401).send('Não autorizado. Faça login primeiro.');
  };
  
module.exports = isAuthenticated