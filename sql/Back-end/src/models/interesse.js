module.exports = (sequelize, DataTypes) => {
    const Interesse = sequelize.define('Interesse', {
      // Definindo o campo 'id' como chave primária e auto incremento
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // Definindo o campo 'interesse' como um campo único
      interesse: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    }, {
      // Opções adicionais
      tableName: 'interesses_agendamentos',
      timestamps: false, // Caso não tenha campos de timestamp (created_at, updated_at)
    });
  
    // Definindo relacionamento (se houver) entre modelos
    Interesse.associate = (models) => {
      // Exemplo de como associar com outros modelos se necessário
      // Interesse.hasMany(models.Agendamento, { foreignKey: 'interesse_id' });
    };
  
    return Interesse;
  };
  