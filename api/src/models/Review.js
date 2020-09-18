const { DataTypes } = require('sequelize');

const {Users, Product} = require('../db')
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

      productId:{  
        type: DataTypes.INTEGER,

        references:{
          model: Product,
          key:"id"
        }},
        username:{
          type:DataTypes.STRING, 
     
          references:{
            model: Users,
            key:"username"
          }}
      })
};

 