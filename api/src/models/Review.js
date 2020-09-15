const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('reviews', {
      comentarios: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      stars:{
          type: DataTypes.INTEGER,
          allowNull: true
      }
  });
};