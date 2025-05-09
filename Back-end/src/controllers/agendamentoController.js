// Importação de módulos necessários
const { where } = require('sequelize');
const Agendamento = require('../models/agendamento.js');
const Cars = require('../models/cars.js');
const statusCarros = require('../models/statuscars.js');
const { any } = require('../utils/multer.js');
const User = require('../models/user.js');
const { response } = require('express');
const Interesse = require('../models/destaques.js');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Função para verificar se um registro existe em uma tabela
async function checkIfExists(column, table, info) {
    const searchResult = await table.findOne({ where: { [column]: info } });
    return searchResult ? searchResult.id : null;
}

// Função para obter agendamentos (GET)
exports.getAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll();
        if (!agendamentos.length) {
            return res.status(404).json({ message: 'Nenhum agendamento encontrado' });
        }
        return res.status(200).json(agendamentos);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar agendamentos', error: err });
    }
};

// Função para criar agendamentos (POST)
exports.postAgendamentos = async (req, res, next) => {    
    try {
        const { id_usuario, id_carro, interesse, data, hora, observacoes } = req.body;
        
        // Validação dos campos obrigatórios
        if (!id_usuario || !interesse || !data || !hora ) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        // Validação do formato da hora (hh:mm)
        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!horaRegex.test(hora)) {
            return res.status(400).json({ message: 'Formato de hora inválido. Use HH:mm' });
        }

        // Verificando se os IDs existem
        const userExists = await checkIfExists('id', User, id_usuario);

        if (!userExists) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        const create = await Agendamento.create({ id_usuario, id_carro, interesse, data, hora, observacoes });
        res.locals.create = create;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
};

exports.emailAgendamento = async (req, res) => {
    try {
            const { email, data, hora, interesse, observacoes} = req.body;
            // Validação dos campos obrigatórios
            if (!email || !data || !hora || !interesse || !observacoes ) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }
    
            // Configuração do transporte de e-mail (usando variáveis de ambiente)
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER, // Definido no .env
                    pass: process.env.EMAIL_PASS // App Password do Gmail
                }
            });
    
            
            const templatePath = path.join("./email", 'emailAgendamento.html');
            let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
            htmlTemplate = htmlTemplate
                .replace('{{data}}', data)
                .replace('{{hora}}', hora)
                .replace('{{interesse}}', interesse)
                .replace('{{observacoes}}', observacoes);
    
    
            // Configuração do e-mail
            const mailOptions = {
                from: "Jotinha veículos",
                to: email,
                subject: "Informações do seu agendamento",
                html: htmlTemplate,
                attachments: [
                    {
                      filename: 'logo.png',
                      path: path.join(__dirname, '../../../Front-end/img/logo.png'),
                      cid: 'logo'
                    }
                  ]
            };
    
            // Enviar o e-mail
            await transporter.sendMail(mailOptions);
    
            return res.status(200).json({ message: 'Agendamento criado com sucesso, confira seu email!', data: res.locals.create });
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
            return res.status(500).json({ message: "Não foi possível enviar o e-mail, tente novamente" });
        }
}

