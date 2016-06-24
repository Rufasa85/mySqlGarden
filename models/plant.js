'use strict';
module.exports = function(sequelize, DataTypes) {
  var plant = sequelize.define('plant', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    edible: DataTypes.BOOLEAN,
    water: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return plant;
};
