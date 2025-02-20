const {
    where
} = require('sequelize');
const User = require('../models/user');
const {
    READUNCOMMITTED
} = require('sequelize/lib/table-hints');
const e = require('express');

//Começo de uma verificação por cargo bem mais complexa, do que precisa -se para este tipo de app
// const checkPermissions = (req, res, perm, next) => {

//     let login = req.session.user

//     if (!login){
//         return res.status(401).send('Não autorizado. Faça login primeiro.');
//     }

//     login = User.findOne({ where: { ramal: login } });

//     if(!login){
//         return res.status(500).send('Não autorizado. Faça login primeiro.');
//     }

//     console.log(login.role);

// }

//  Puxar o cargo do user.
// Puxar as permissões atreladas ao cargo do user
// Check the true or false
// If true let's go
// Else can return false

const checkPermissions = (requiredRole) => {

    return async (req, res, next) => {

        const login = req.session.user;

        if (!login) {
            return res.status(401).send('Não autorizado. Faça login primeiro!')
        }

        const user = await User.findOne({
            where: {
                id: login.id
            }
        });

        if (!user) {
            return res.status(401).send('Usuário não encontrado');
        }

        if (user.role === requiredRole) {
            return next();
        } else {
            return res.status(403).send('Permissão negada. Você não tem acesso a esta área.');
        }
    }
}
module.exports = checkPermissions;