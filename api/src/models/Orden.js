const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('orden', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.FLOAT, 
            allowNull: false,
          },
          stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
           status:{
            type: DataTypes.ENUM(["carrito", "creada", "procesando", "cancelada", "completa"])
          }
    });
  };