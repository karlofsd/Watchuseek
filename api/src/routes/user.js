const server = require('express').Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db.js');
const { Carrito } = require('../db.js');
const {verifyToken} = require('../middlewares/authentication.js')
const { Sequelize: { Op, fn, col }, Sequelize } = require('sequelize');

server.post("/", (req, res) => {
  const { email, password, username} = req.body;
  Users.create(
    { 
      username,
      email,
      password: bcrypt.hashSync(password, 10)
    }
  )
  .then(user => {
      return res.status(201).send(user)
    })
  .catch(error => {
      return res.status(404).json(error)
    })
});

// ruta updateAdmin

server.post('/auth/promote/:id',verifyToken,(req,res) =>{
  const id = req.params.id
  Users.update({isAdmin:true},{where:{id:id}})
  .then(user => res.status(201).send('usuario updateado!'))
  .catch(error => res.status(400).send(error))
})

server.get("/", (req, res) => {
  Users.findAll()
    .then(users => {
      return res.status(201).send(users)
    })
    .catch(err => {
      return res.status(404).send(err)
    })
});

server.get("/:email", (req, res) => {
  const email = req.params.email;
  const password = req.body.password
  Users.findOne({ where: { email: email } })
    .then(user =>
      res.status(201).send(user)
    )
    .catch(err => {
      return res.status(404).send(err)
    })
})

server.get('/get/:id',(req,res) => {
  Users.findByPk(req.params.id)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(404).send('No se encontro usuario'))
})

server.put("/:id", (req, res) => {
  let id = req.params.id
  const { email, password } = req.body
  Users.update({ email, password }, { where: { id } })
    .then(users => {
      return res.status(201).send(users)
    })
    .catch(err => {
      return res.status(404).send(err)
    })
})

server.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const userEliminated = await Users.destroy({
    where: { id }
  });
  if (!userEliminated) {
    return response.status(404).json({
      message: `The user with id: ${id} doesn't exist.`
    });
  }
  return response.status(200).json({
    message: 'User deleted.'
  });

});
server.post("/:UserId/carrito", (req, res) => {
  var id = req.params.UserId
  const { name, price, quantity, status, productId } = req.body;
  Carrito.findOrCreate({ where: { userId: id, name, price, quantity, status, productId } })
    .then(order => {
      res.status(201).json(order)
    })
    .catch(err => {
      res.status(404).json('No se pudo agregar')
    })
})


server.get("/:UserId/carrito", (req, res) => {
  var id = req.params.UserId

  Carrito.findAll({
    where: {
      userId: id,
      status: { [Op.or]: ["carrito"] }
    }
  })
    .then(orden => {
      res.status(201).send(orden)
    })
    .catch(err => {
      res.status(404).send('No se encontraron pedidos o hubo un error!')
    })
})


server.get("/:orderId/admin/:stat", (req, res) => {
  var id = req.params.orderId;
  var { stat } = req.params
  Carrito.findAll(stat ? {
    where: {
      order: id,
      status: stat
    }
  } : {
      where: {
        order: id
      }
    })
    .then(orden => {
      res.status(201).send(orden)
    })
    .catch(err => {
      res.status(404).send('No se encontraron pedidos o hubo un error!')
    })
})


server.delete('/:UserId/carrito', (req, res) => {
  let id = req.params.UserId

  Carrito.destroy({
    where: {
      userId: id
    }
  })
    .then(orden => {
      res.status(201).send('Se ha vaciado el carrito')
    })
    .catch(err => {
      res.status(404).send('Hubo un error')
    })
})


server.delete('/:UserId/carrito/:id', (req, res) => {
  let userId = req.params.UserId
  let id = req.params.id

  Carrito.destroy({
    where: {
      userId, id
    }
  })
    .then(orden => {
      res.status(201).send('Se ha vaciado el carrito')
    })
    .catch(err => {
      console.log(err)
      res.status(404).send('Hubo un error')
    })
})


// server.put('/:UserId/completa/:id', (req, res) => {

//   let userId = req.params.UserId
//   let id = req.params.id

//   Carrito.update({ status: "carrito" ? "procesando" : "completa"}, { where: { userId, id } })
//     .then(orden => {
//       res.status(201).send(orden)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(404).send(err)
//     })
// })


server.put('/:UserId/creada/:order', (req, res) => {

  let userId = req.params.UserId;
  let order = req.params.order;

  Carrito.update({ status: "creada", order: order }, { where: { userId, status: "carrito" } })
    .then(orden => {
      res.status(201).send(orden)
    })
    .catch(err => {
      console.log(err)
      res.status(404).send(err)
    })
})


server.put('/:UserId/cancelada/:id', (req, res) => {

  let userId = req.params.UserId
  let id = req.params.id
  const { status } = req.body

  Carrito.update({ status: "cancelada" }, { where: { userId, id } })
    .then(orden => {
      res.status(201).send(orden)
    })
    .catch(err => {
      console.log(err)
      res.status(404).send(err)
    })
})


server.put('/:UserId/cantidad/:id', (req, res) => {
  let userId = req.params.UserId
  let id = req.params.id
  const { quantity } = req.body

  Carrito.update({ quantity }, { where: { userId, id } })
    .then(orden => {
      res.status(201).send(orden)
    })
    .catch(err => {
      console.log(err)
      res.status(404).send(err)
    })
})



server.get('/:id/ordenes', (req, res) => {
  const { id } = req.params
  Carrito.findAll({
    where: {
      userId: id
    }
  })
    .then(orden => {
      res.status(201).send(orden)
    })
    .catch(err => {
      res.status(404).send(err)
    })
})


server.get('/:id/orders', async (request, response) => {
  const { id } = request.params;

  const orders = await Carrito.findAll({
    where: {
      order: id
    }
  });

  if (!orders) {
    return response.status(400).json({
      message: 'Orders not found.'
    });
  }

  return response.status(200).json({
    orders
  });

});

server.get("/order/ordersAdmin", (req, res) => {
  Carrito.findAll({
    attributes: ['order', 'status',
      [Sequelize.fn('count', Sequelize.col('id')), 'idCount']],
    group: ['order', 'status'],
    order: [['order', 'DESC']],
    raw: true
  })
    .then(order => {
      res.status(200).send(order);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

// Location.findAll({
//   attributes: { 
//       include: [[Sequelize.fn("COUNT", Sequelize.col("sensors.id")), "sensorCount"]] 
//   },
//   include: [{
//       model: Sensor, attributes: []
//   }],
//   group: ['Location.id']
// })

server.get("/order/allOrders/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  Carrito.findAll({ where: { order: orderId } })
    .then(order => {
      res.status(200).send(order);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

// server.put("/:userId/order", (req, res)=>{
//   let userId = req.params.userId
//   let 
//   Carrito.increment({'order': 1}, {where: {userId}})
//   .then(response =>{
//     res.status(201).send(response)
//   })
//   .catch(err =>{
//     res.status(404).send(err)
//   })
// })


module.exports = server;