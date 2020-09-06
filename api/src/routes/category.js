const server = require('express').Router();
const { Categories } = require('../db.js');

server.post('/create', async (request, response) => {
  const { name, description } = request.body;
  let newCategory;
  // Crear y guardar nueva categoria
try {  
   newCategory = await Categories.findOrCreate({
    where: {
      name,
      description
    }
  });
} catch( error) {
  response.status(400).json({
    error
  });
}
  // Objeto creado
  response.status(201).json({
    newCategory
  });

});

server.delete('/:id', async (request, response) => {
  const { id } = request.params;
  // Eliminar categoria por ID
  await Categories.remove({
    where: {
      id
    }
  });
  // Responder con mensaje personalizado
  response.status(200).json({
    message: 'Category deleted.'
  });
});

server.get('/', (req, res, next) => {
  Categories.findAll()
      .then(categories => {
          res.json(categories);
          console.log(categories);
      })
      .catch(next);
});

server.put('/:id', (req, res) => {
  let id = req.params.id;
  Categories.update ({
    name: req.body.name, description: req.body.description
    },{ 
      where: {id:id}
      }
      ).then(category => {
        res.send(category)
      })
    });

module.exports = server;
