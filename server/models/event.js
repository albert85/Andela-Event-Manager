
export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    bookingStatus: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  });
  // Associates with centers table
  Event.associate = (models) => {
    Event.belongsTo(models.Center, {
      foreignKey: 'centerId',
    });
  };
  return Event;
};
