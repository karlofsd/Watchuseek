const server = require('express').Router();
const { Carrito } = require('../db.js');

server.get('/', async (request, response) => {
  const { status } = request.query;
  let condition = {
    where: {
      status
    }
  };

  const orders = await Carrito.findAll(status && condition);

  if (!orders) {
    return response.status(400).json({
      message: 'Orders not found'
    });
  }

  return response.status(200).json({
    orders
  });

});

module.exports = server;
