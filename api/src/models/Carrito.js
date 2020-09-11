const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('carrito', {
    status:{
      type: DataTypes.ENUM(["carrito", "creada", "procesando", "cancelada", "completa"])
    }
  });
};