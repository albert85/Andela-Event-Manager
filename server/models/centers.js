
module.exports = (sequelize, DataTypes) => {
  const centers = sequelize.define('centers', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
  });

  // Associates with user table
  centers.associate = (models) => {
    centers.belongsTo(models.user, {
      foreignKey: 'userId',
    });
  };

  return centers;
};
