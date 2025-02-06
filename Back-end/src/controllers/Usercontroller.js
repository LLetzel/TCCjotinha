const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

class UserController {
    async register(req, res) {
        try {
            const { 
                nome, 
                email, 
                senha, 
                telefone, 
                cpf, 
                nascimento, 
                sexo,
                tipo_id 
            } = req.body;

            // Check existing email/cpf
            if (await User.findOne({ where: { email } })) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            if (await User.findOne({ where: { cpf } })) {
                return res.status(400).json({ error: 'CPF já cadastrado' });
            }

            // Create user
            const user = await User.create({
                nome,
                email,
                senha: await bcrypt.hash(senha, 10),
                telefone,
                cpf,
                nascimento,
                sexo,
                tipo_id: tipo_id || 2 // default to client
            });

            user.senha = undefined;

            const token = jwt.sign({ id: user.id, tipo_id: user.tipo_id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            });

            return res.status(201).json({ user, token });
        } catch (error) {
            return res.status(400).json({ error: 'Erro no registro: ' + error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const user = await User.findOne({ 
                where: { email },
                attributes: ['id', 'nome', 'email', 'senha', 'tipo_id']
            });

            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            if (!await bcrypt.compare(senha, user.senha)) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            user.senha = undefined;

            const token = jwt.sign({ id: user.id, tipo_id: user.tipo_id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            });

            return res.json({ user, token });
        } catch (error) {
            return res.status(400).json({ error: 'Erro no login: ' + error.message });
        }
    }

    async validateToken(req, res) {
        const { token } = req.body;

        try {
            const decoded = jwt.verify(token, authConfig.secret);
            return res.json({ valid: true, decoded });
        } catch (error) {
            return res.json({ valid: false });
        }
    }
}

module.exports = new UserController();
