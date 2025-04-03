const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const CarrosDestaques = sequelize.define('destaques', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  id_carro: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  descricao_curta: {
    type: Sequelize.STRING(100),
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = CarrosDestaques;
