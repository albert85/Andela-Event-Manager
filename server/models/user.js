
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
  // Associates with user table
  user.associate = (models) => {
    user.hasMany(models.events, {
      foreignKey: 'userId',
    });
  };
  // Associates with centers table
  user.associate = (models) => {
    user.hasMany(models.centers, {
      foreignKey: 'userId',
    });
  };
  return user;
};
