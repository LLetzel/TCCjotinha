const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            telefone: DataTypes.INTEGER,
            cpf: DataTypes.INTEGER,
            nascimento: DataTypes.DATE,
            tipo_id: DataTypes.STRING,
            sexo: DataTypes.STRING,
        }, {
            sequelize
        })
    }}

module.exports = User; 