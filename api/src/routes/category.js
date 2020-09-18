const server = require('express').Router();
const { Categories } = require('../db.js');
const {verifyToken,verifyAdmin} = require('../middlewares/authentication')

// CREATE CATEGORY (ADMIN)
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

// DELETE CATEGORY (ADMIN)
server.delete('/:id', async (request, response) => {
  const { id } = request.params;
  // Eliminar categoria por ID
  await Categories.destroy({
    where: {
      id
    }
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
server.put('/:id',[verifyToken, verifyAdmin],(req, res) => {
  let id = req.params.id;
  Categories.update ({
    name: req.body.name, description: req.body.description
    },{ 
      where: {id:id}
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
  const id = req.params.id;

  Categories.findByPk(id)
  .then(e => {
    res.send(e);
  })
  .catch(err => {
    res.status(404).send(err);
  })
});
    
module.exports = server;
