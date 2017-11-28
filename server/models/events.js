// exporting user model
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    name: DataTypes.STRING,
    bookingStatus: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    centerId: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
  });
  // Associating foreignKey userId with user table
  events.associate = (models) => {
    events.hasMany(models.user, {
      foreignKey: 'userId',
      as: 'userIdEvents',
    });
  };

  // Associating foreignkey centerId with center's table
  events.associate = (models) => {
    events.hasMany(models.centers, {
      foreignKey: 'centerId',
      as: 'centerLocation',
    });
  };
  return events;
};
