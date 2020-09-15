const { Product, Categories } = require('../db');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('category_products', {
 
    productId: {
        type: DataTypes.INTEGER,
        references: Product,
        key: "id"
    },

    categoryId: {
        type: DataTypes.INTEGER,
        references: Categories,
        key: "id"
    }
 
  });
};

 