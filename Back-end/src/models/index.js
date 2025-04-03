const Cars = require('./cars');
const CarrosDestaques = require('./destaques');
const statusCarros = require('./statuscars');
const tipos_carros = require('./tipocars');

// Relacionamentos
CarrosDestaques.belongsTo(Cars, {
  foreignKey: 'id_carro',
  as: 'carro',
});

Cars.hasOne(CarrosDestaques, {
  foreignKey: 'id_carro',
  as: 'destaqueData',
});

Cars.belongsTo(statusCarros, {
  foreignKey: 'status_id',
  as: 'status',
});

Cars.belongsTo(tipos_carros, {
  foreignKey: 'tipo_id',
  as: 'tipo',
});

// Exportar todos os modelos já com relacionamento
module.exports = {
  Cars,
  CarrosDestaques,
  statusCarros,
  tipos_carros,
};
