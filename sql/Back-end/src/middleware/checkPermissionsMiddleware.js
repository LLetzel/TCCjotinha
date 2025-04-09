const User = require('../models/user');
const session = require('express-session');

//check permissions middleware
const checkPermissions = (role) => {
    
    return (req, res, next) => {
    
        if (req.session.user && req.session.role.tipo_id === role) {
            next();
        }
        else {
            res.status(403).json({
                message: 'Você não tem permissão para acessar essa rota'
            });
        }
    }
}

module.exports = checkPermissions;
