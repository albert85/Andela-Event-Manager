'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    bookingStatus: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    centerId: DataTypes.INTEGER,
    eventDate: DataTypes.DATE
  }
}),
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
