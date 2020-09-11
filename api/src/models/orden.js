const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orden', {
      name: {
        type:DataTypes.STRING,
        allorNull: false
      },
      price: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  });
};