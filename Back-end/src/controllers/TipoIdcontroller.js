const User = require('../models/User');

module.exports = {
    // GET /users
    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },
    // GET /users/:id
    async show(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        return res.json(user);
    }
    };