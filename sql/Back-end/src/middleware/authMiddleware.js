const isAuthenticated = (req, res) => {
  const userId = localStorage.getItem('userId');
    if (!userId || userId === null || userId === undefined) {
      alert('Você não está logado, faça login primeiro');
    window.location('/login');
    }
    
    
  };
  
module.exports = isAuthenticated