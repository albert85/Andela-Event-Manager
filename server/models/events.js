'use strict';
module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define('events', {
    name: DataTypes.STRING,
    bookingStatus: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    centerId: DataTypes.INTEGER,
    eventDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return events;
};