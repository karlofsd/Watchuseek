const server = require('express').Router();
const { Categories } = require('../db.js');

server.post('/category/', async (request, response) => {
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

server.delete('/category/:id', async (request, response) => {
  const { id } = request.params;
  // Eliminar categoria por ID
  await Categories.destroy({
    where: {
      id
    }
  });
  // Responder con mensaje personalizado
  response.status(200).json({
    message: 'Category deleted.'
  });

});

module.exports = server;
