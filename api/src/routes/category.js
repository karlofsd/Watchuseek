const server = require('express').Router();
const { Categories } = require('../db.js');

server.get('/category/', async (request, response) => {
  const { name, description } = request.body;
  // Crear y guardar nueva categoria
  const newCategory = await Categories.findOrCreate({
    where: {
      name,
      description
    }
  });
  // Objeto creado
  response.status(201).json({
    newCategory
  });

});

module.exports = server;
