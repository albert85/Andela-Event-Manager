'use strict';
module.exports = (sequelize, DataTypes) => {
  var centers = sequelize.define('centers', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return centers;
};