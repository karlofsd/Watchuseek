const server = require('express').Router();
const { Categories } = require('../db.js');
const {verifyToken,verifyAdmin} = require('../middlewares/authentication')

// CREATE CATEGORY (ADMIN)
server.post('/create',[verifyToken,verifyAdmin],(req, res) => {
  const { name, description } = req.body;
  // Crear y guardar nueva categoria
   Categories.findOrCreate({
    where: {
      name,
      description
    }
  })
  .then(newCategory => res.status(201).json(
    newCategory
  ))
  .catch(error => res.status(400).json({
    error
  })) 
});

// DELETE CATEGORY (ADMIN)
server.delete('/:id', [verifyToken, verifyAdmin], (req, res) => {
  const { id } = req.params;
  // Eliminar categoria por ID
  Categories.destroy({
    where: {
      id
    }})
  .then(() => res.status(200).json({
      message: 'Category deleted.'
    }))
  .catch(err => res.status(400).json(err))
});

// UPDATE CATEGORY
server.put('/:id',[verifyToken, verifyAdmin],(req, res) => {
  const {id} = req.params;
  const {name,description} = req.body
  Categories.update ({name, description},{ 
    where: {id}
    }
  )
  .then(category => res.status(204).json(category))
  .catch((err)=> res.status(404).json(err))

});

// GET ALL CATEGORIES    
server.get('/', (req, res) => {
  Categories.findAll()
    .then(categories => res.status(200).json(categories))
    .catch(err => res.status(400).send(err))
});

// GET CATEGORY BY ID
server.get("/:id", (req,res) => {
  const {id} = req.params;
  Categories.findByPk(id)
  .then(category => res.status(200).json(category))
  .catch(err => res.status(400).send(err))
});
    
module.exports = server;
