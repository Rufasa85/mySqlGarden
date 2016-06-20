'use strict';
module.exports = function(sequelize, DataTypes) {
  var plant = sequelize.define('plant', {
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    edible: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return plant;
};