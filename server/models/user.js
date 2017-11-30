
export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
  // Associates with user table
  user.associate = (models) => {
    user.hasMany(models.Event, {
      foreignKey: 'userId',
    });
  };
  // Associates with centers table
  user.associate = (models) => {
    user.hasMany(models.Center, {
      foreignKey: 'userId',
    });
  };
  return user;
};
