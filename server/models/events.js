
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    name: DataTypes.STRING,
    bookingStatus: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    centerId: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
  });
  // Associates with user table
  events.associate = (models) => {
    events.belongsTo(models.user, {
      foreignKey: 'userId',
    });
  };
  // Associates with centers table
  events.associate = (models) => {
    events.belongsTo(models.centers, {
      foreignKey: 'centerId',
    });
  };
  return events;
};
