const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('checkout', {
      provincia:{
        type: DataTypes.STRING,
        allowNull: false 
      },
      departamento:{
          type: DataTypes.STRING,
          allowNull: false,
      },
      localidad:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      direccion:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };