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

// ACTUALIZAR ESTADO DE ORDEN
server.put('/:userId/changeStatus/',(req,res) => {
  const cancel = req.query.cancel
  Carrito.findAll({where:{userId:req.params.userId}})
    .then(productos => {
      console.log(productos)
      if(productos[0].status === 'carrito'){
        return Carrito.update({status:'creada'},{where:{userId:req.params.userId}})
        .then(() => res.status(201).send('orden creada'))
      } else if(productos[0].status === 'creada'){
        return Carrito.update({status:'procesando'},{where:{userId:req.params.userId}})
        .then(() => res.status(201).send('orden procesada'))
      }else if(productos[0].status === 'procesando'){
        if(cancel){
          return Carrito.update({status:'cancelado'},{where:{userId:req.params.userId}})
          .then(() => res.status(201).send('orden cancelada'))
        }
        else return Carrito.update({status:'completa'},{where:{userId:req.params.userId}})
        .then(() => res.status(201).send('orden completada'))
      }else return res.status(201).send('no hay ordenes pendientes')
    }).catch(err => res.status(404).send(err))
})


module.exports = server;
