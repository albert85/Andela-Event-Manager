// exporting centers model
module.exports = (sequelize, DataTypes) => {
  const centers = sequelize.define('centers', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    userid: DataTypes.INTEGER,
  });
  centers.associate = (models) => {
    centers.hasMany(models.user, {
      foreignKey: 'userId',
      as: 'userIdNo',
    });
  };
  return centers;
};
