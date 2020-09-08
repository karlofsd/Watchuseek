const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('users', {
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail:true
        }
      },
      Password:{
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  };