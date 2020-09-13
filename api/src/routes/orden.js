const server = require('express').Router();
const { Carrito, Ordenfinal } = require('../db.js');

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
server.put('/:order/changeStatus/',(req,res) => {
  const cancel = req.query.cancel
  Carrito.findAll({where:{order:req.params.order}})
    .then(productos => {
      console.log(productos)
      if(productos[0].status === 'carrito'){
        return Carrito.update({status:'creada'},{where:{order:req.params.order}})
        .then(() => res.status(201).send('orden creada'))
      } else if(productos[0].status === 'creada'){
        return Carrito.update({status:'procesando'},{where:{order:req.params.order}})
        .then(() => res.status(201).send('orden procesada'))
      }else if(productos[0].status === 'procesando'){
        /* if(cancel){
          return Carrito.update({status:'cancelado'},{where:{order:req.params.order}})
          .then(() => res.status(201).send('orden cancelada'))
        }
        else  */return Carrito.update({status:'completa'},{where:{order:req.params.order}})
        .then(() => res.status(201).send('orden completada'))
      }else return res.status(201).send('no hay ordenes pendientes')
    }).catch(err => res.status(404).send(err))
})


// modelo contador
server.get('/algo/count',(req,res) => {
  Ordenfinal.findAll({
    limit: 1,
    order: [['id','DESC']]
  })
  .then(e => {
    res.status(200).send(e);
  })
})

server.post("/count", (req,res) => {
  Ordenfinal.create({contador: 3})
  .then(e => {
    res.status(200).send(e);
  })
  .catch(err => {
    res.status(400).send(err);
  })
});


module.exports = server;
