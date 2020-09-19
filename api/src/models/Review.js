const { DataTypes } = require('sequelize');
const {Users} = require('../db')
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
      }, 
      username:{
        type: DataTypes.STRING,
        references: Users,
        referenceskey: "username"
        }
  });
};

// addressId: {
//   type: DataTypes.INTEGER,
//   references: 'addresses',
//   referencesKey: 'id'
// }