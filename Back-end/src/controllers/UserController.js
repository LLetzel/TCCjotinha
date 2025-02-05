const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

class UserController {
    // Register new user
    async register(req, res) {
        try {
            const { email, cpf } = req.body;

            // Verify existing user
            if (await User.findOne({ where: { email } })) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            if (await User.findOne({ where: { cpf } })) {
                return res.status(400).json({ error: 'CPF já cadastrado' });
            }

            const user = await User.create(req.body);
            user.senha = undefined;

            const token = jwt.sign({ id: user.id, tipo_id: user.tipo_id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            return res.json({ user, token });
        } catch (error) {
            return res.status(400).json({ error: 'Falha no registro' });
        }
    }

    // User login
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            if (!await bcrypt.compare(senha, user.senha)) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            user.senha = undefined;

            const token = jwt.sign({ id: user.id, tipo_id: user.tipo_id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            return res.json({ user, token });
        } catch (error) {
            return res.status(400).json({ error: 'Falha no login' });
        }
    }

    // Get user profile
    async getProfile(req, res) {
        try {
            const user = await User.findByPk(req.userId);
            user.senha = undefined;
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar perfil' });
        }
    }

    // Update user profile
    async updateProfile(req, res) {
        try {
            const { email, senha, novaSenha } = req.body;
            const user = await User.findByPk(req.userId);

            if (email && email !== user.email) {
                if (await User.findOne({ where: { email } })) {
                    return res.status(400).json({ error: 'Email já está em uso' });
                }
            }

            if (senha && novaSenha) {
                if (!await bcrypt.compare(senha, user.senha)) {
                    return res.status(401).json({ error: 'Senha atual incorreta' });
                }
                req.body.senha = novaSenha;
            }

            await user.update(req.body);
            user.senha = undefined;

            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar perfil' });
        }
    }

    // List all users (admin only)
    async listUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['senha'] }
            });
            return res.json(users);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao listar usuários' });
        }
    }

    // Delete user (admin or self)
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            
            if (req.userType !== 1 && req.userId !== parseInt(id)) {
                return res.status(403).json({ error: 'Não autorizado' });
            }

            await User.destroy({ where: { id } });
            return res.json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar usuário' });
        }
    }
}

module.exports = new UserController();