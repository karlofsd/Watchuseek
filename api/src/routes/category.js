const server = require('express').Router();
const { Categories } = require('../db.js');


// CREATE CATEGORY
server.post('/create', (request, response) => {
  const { name, description } = request.body;
  // Crear y guardar nueva categoria
  Categories.create({
    where: {
      name,
      description
    }
  }).then(newCategory =>
    response.status(201).json(newCategory)
  )
  .catch( error => 
  response.status(400).json(error));
});

// DELETE CATEGORY
server.delete('/:id', async (request, response) => {
  const { id } = request.params;
  // Eliminar categoria por ID
  await Categories.destroy({
    where: {id}
  })
  .then(() => {
    response.status(200).json({
      message: 'Category deleted.'
    });
  })
  .catch(err => {
    response.status(400).send(err)
  })
});

// UPDATE CATEGORY
server.put('/:id', (req, res) => {
  const {id} = req.params;
  const {name, description} = req.body
  Categories.update ({name,description},
    {
    where: {id}
    }
  ).then(category => {
    res.send(category)
  })
  .catch((err)=>{
    res.status(404).json(err)
  })
});

// GET ALL CATEGORIES
server.get('/', (req, res) => {
  Categories.findAll()
      .then(categories => {
          res.json(categories);
      })
      .catch(err => {
        res.status(400).send(err);
      });
});

// GET CATEGORY BY ID
server.get("/:id", (req,res) => {
  const {id} = req.params;
  Categories.findByPk(id)
  .then(e => 
    res.send(e)
  )
  .catch(err => 
    res.status(404).send(err)
  )
});


module.exports = server;
