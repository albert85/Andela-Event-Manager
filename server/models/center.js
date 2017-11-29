
module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
  });
  // Associates with user table
  Center.associate = (models) => {
    Center.belongsTo(models.user, {
      foreignKey: 'userId',
    });
  };
  return Center;
};
