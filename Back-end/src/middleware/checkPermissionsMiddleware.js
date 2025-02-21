const User = require('../models/user');

const checkPermissions = (requiredRole) => {
    return async (req, res, next) => {
        const login = req.session.user;

        if (!login) {
            return res.status(401).send('Não autorizado. Faça login primeiro!');
        }

        const user = await User.findOne({ where: { id: login.id } });

        if (!user) {
            return res.status(401).send('Usuário não encontrado');
        }

        // Verificando se o tipo_id representa a permissão necessária
        const isAdmin = user.tipo_id === 1; 

        if (requiredRole === 'Administrador' && isAdmin) {
            return next();
        } else {
            return res.status(403).send('Permissão negada. Você não tem acesso a esta área.');
        }
    };
};

module.exports = checkPermissions;
