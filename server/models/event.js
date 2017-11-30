
export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    bookingStatus: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
  });
  // Associates with user table
  Event.associate = (models) => {
    Event.belongsTo(models.user, {
      foreignKey: 'userId',
    });
  };
  // Associates with centers table
  Event.associate = (models) => {
    Event.belongsTo(models.Center, {
      foreignKey: 'centerId',
    });
  };
  return Event;
};
