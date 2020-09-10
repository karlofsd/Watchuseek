const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('carrito', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.INTEGER, 
            allowNull: false,
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
           status:{
            type: DataTypes.ENUM(["carrito", "creada", "procesando", "cancelada", "completa"])
          }
    });
  };