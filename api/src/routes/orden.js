const server = require('express').Router();
const { Carrito, Product } = require('../db.js');

server.get('/', async (request, response) => {
  const orders = await Carrito.findAll({ include: Product });
  if(!orders) {
    return response.status(400).json({
      message: 'Orders not found' 
    });
  }

  return response.status(200).json(
    orders
  );

});


server.get('/:id', async (request, response) => {
  const { id } = request.params;
  const orderFound = await Carrito.findByPk(id);

  if (!orderFound) {
    return response.status(400).json({
      message: `The order with id: ${id} doesn't exist.`
    });
  }

  return response.status(200).json({
    orderFound
  });
  
});


server.put('/:id', (req, res)=>{
  var id = req.params.id
  const {name, price, quantity, status} = req.body
  Carrito.update({name, price, quantity, status}, {where: {id}})
  .then(respons=>{
    res.status(201).send(respons) 
  })
  .catch(err=>{
    res.status(404).send('No se pudo completar con exito!')
  }) 
})
module.exports = server;
