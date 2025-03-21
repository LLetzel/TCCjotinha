const isAuthenticated = (req, res, next) => {
  const userId = localStorage.getItem('userId');
    if (!userId) {
      return next();
    }
    alert('Você não está logado');
    return res.status(401).send('Não autorizado. Faça login primeiro.');
    window.location('../../../Front-end/src/login/login.html')
  };
  
module.exports = isAuthenticated