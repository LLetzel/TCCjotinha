// Importação do módulo Sequelize e inicialização da conexão com o banco de dados
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

// Definição do modelo de dados Usuario
const Usuario = sequelize.define('Usuarios', {
    // Identificador único do usuário
    idUsuarios: {
        type: Sequelize.INTEGER, // Tipo do dado como inteiro
        primaryKey: true, // Define que esse campo é a chave primária
        autoIncrement: true // Incrementa automaticamente o valor desse campo a cada inserção
    },
    // Outros campos do modelo de dados Usuario
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    cpf: Sequelize.STRING,
    senha: Sequelize.STRING,
    celular: Sequelize.STRING,
    cep: Sequelize.STRING,
    logradouro: Sequelize.STRING,
    bairro: Sequelize.STRING,
    cidade: Sequelize.STRING,
    estado: Sequelize.STRING,
    foto: Sequelize.STRING,
    Tipos_Usuarios_idTipos_Usuarios: Sequelize.INTEGER // Chave estrangeira que referencia o modelo Tipos_Usuarios
}, {
    // Desabilita a criação dos campos createdAt e updatedAt
    timestamps: false
});

// Exportação do modelo de dados Usuario
module.exports = Usuario;