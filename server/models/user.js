
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
// user.associate = (models) => {
//   user.belongsTo(models.events, {
//     foreignKey: ''
//   })
// }
  return User;
};
