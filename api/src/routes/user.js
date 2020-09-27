const server = require('express').Router();
const bcrypt = require('bcrypt');
const { Users, Carrito, Checkout} = require('../db.js');
const {verifyToken} = require('../middlewares/authentication.js')
const { Sequelize: { Op, fn, col }, Sequelize } = require('sequelize');

// CREATE USER
server.post("/", (req, res) => {
  const { email, password, username, isAdmin} = req.body;
  Users.create({ 
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdmin
    })
  .then(user => {return res.status(201).json(user)})
  .catch(error => {return res.status(400).json(error)})
});

// GET ALL USERS
server.get("/", (req, res) => {
  Users.findAll()
    .then(users => {return res.status(200).json(users)})
    .catch(err => {return res.status(400).json(err)})
});


server.get("/:email", (req, res) => {
  const email = req.params.email;
  const password = req.body.password
  Users.findOne({ where:{email:email}})
    .then(user =>res.status(200).json(user))
    .catch(err => {return res.status(400).json(err)})
})


server.get('/get/:id',(req,res) => {
  Users.findByPk(req.params.id)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json('No se encontro usuario'))
})

// UPDATE PROFILE
server.put("/:id", (req, res) => {
  let id = req.params.id
  const {name, email, image} = req.body
  Users.update({name, email, image}, {where:{id}})
    .then(user => {return res.status(201).send(user)})
    .catch(err => {return res.status(404).send(err)})
})

// DELETE USER
server.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const userEliminated = await Users.destroy({where:{id}});
  if (!userEliminated) {
    return response.status(400).json({message: `El usuario con el id: ${id} no existe.`});
  }
    return response.status(200).json({message: 'User deleted.'});
});

//------------------CARRITO-------------------
// ADD TO CART
server.post("/:UserId/carrito", (req, res) => {
  var id = req.params.UserId
  const { name, price, quantity, productId } = req.body;
  Carrito.findOrCreate({ where: { userId: id, name, price, quantity,status:'carrito',productId} })
    .then(order => {res.status(201).json(order)})
    .catch(err => {res.status(400).json('No se pudo agregar')})
})

// GET CART
server.get("/:UserId/carrito", (req, res) => {
  var id = req.params.UserId
  Carrito.findAll({
    where: {userId: id,status: { [Op.or]: ["carrito"] }}
  })
    .then(orden => {res.status(200).send(orden)})
    .catch(err => {res.status(400).send('No se encontraron pedidos o hubo un error!')})
})

// CLEAR CART
server.delete('/:UserId/carrito', (req, res) => {
  let id = req.params.UserId

  Carrito.destroy({
    where: {userId: id, status:'carrito'}
  })
    .then(orden=>{res.status(200).send('Se ha vaciado el carrito')})
    .catch(err=>{res.status(400).send('Hubo un error')})
})

// REMOVE PRODUCT
server.delete('/:UserId/carrito/:id', (req, res) => {
  let userId = req.params.UserId
  let productId = req.params.id

  Carrito.destroy({
    where: {userId, productId, status:'carrito'}
  })
    .then(orden=>{res.status(200).send('Se elimino el producto')})
    .catch(err=>{res.status(400).send('Hubo un error')
    })
})

// SAVE CHECKOUT INFO
server.post('/carrito/checkout',(req,res) => {
  let info = req.body
  console.log('--info rutas---')   
  console.log(info)                               
  Checkout.findOrCreate({where: info})
  .then(response => res.status(201).send(response))
  .catch(err => res.status(404).send(err))
})

// GET CHECKOUT
server.get('/carrito/checkout/:ordenfinalId',(req,res) => {
  let {ordenfinalId} = req.params
  Checkout.findOne({where:{ordenfinalId}})
  .then(check => res.status(200).json(check))
  .catch(err => res.status(404).send(err))
})

// ------------------ ORDENES ----------------
// CREATE ORDER
server.put('/:UserId/creada/:order', (req, res) => {
  let userId = req.params.UserId;
  let order = req.params.order;
  console.log(`numero de orden: ${order}`)
  
  Carrito.update({status: "creada", order: order }, 
    {where:{userId, status: "carrito"} 
  })
    .then(orden=>{res.status(204).send(orden)})
    .catch(err=> {res.status(400).send(err)})
})

// CANCEL ORDER PRODUCT
server.put('/:UserId/cancelada/:id', (req, res) => {
  let userId = req.params.UserId
  let id = req.params.id
  const { status } = req.body

  Carrito.update({ status: "cancelada" }, { where: { userId, id } })
    .then(orden=>{res.status(204).send(orden)})
    .catch(err=>{res.status(400).send(err)})
})

// GET ORDER PRODUCTS BY ID
server.get('/:id/ordenes', (req, res) => {
  const { id } = req.params
  Carrito.findAll({
    where: {
      userId: id
    }
  })
    .then(orden=>res.status(201).send(orden))
    .catch(err=>res.status(400).send(err))
})

// GET ORDER BY ID
server.get('/:id/orders', async (request, response) => {
  const { id } = request.params;

  const orders = await Carrito.findAll({
    where: {order: id}
  });

  if (!orders) {
    return response.status(400).json({message: 'Orders not found.'});
  }

  return response.status(200).json({orders});
});

// GET ORDER BY ID/STATUS
server.get("/:orderId/admin/:stat", (req, res) => {
  var id = req.params.orderId;
  var { stat } = req.params
  console.log(stat)
  Carrito.findAll(stat ? {
    where: {order: id, status: stat}
  } : {
      where: {order: id}
    })
    .then(orden=>{res.status(200).send(orden)})
    .catch(err=>{res.status(400).send('No se encontraron pedidos o hubo un error!')})
})

// GET ORDERS
server.get("/order/ordersAdmin", (req, res) => {
  Carrito.findAll({
    attributes: ['order', 'status',
      [Sequelize.fn('count', Sequelize.col('id')), 'idCount']],
    group: ['order', 'status'],
    order: [['order', 'DESC']],
    raw: true
  })
    .then(order=>{res.status(200).send(order)})
    .catch(err=>{res.status(400).send(err)});
})

// GET ORDERS BY FILTER
server.get("/:filter/ordersAdmin", (req, res) => {
  let {filter} = req.params
  Carrito.findAll({
    attributes: ['order', 'status',
      [Sequelize.fn('count', Sequelize.col('id')), 'idCount']],
    group: ['order', 'status'],
    order: [[`${filter}`, 'DESC']],
    raw: true
  })
    .then(order=>{res.status(200).send(order)})
    .catch(err=>{res.status(400).send(err)});
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
    .then(order=>{res.status(200).send(order)})
    .catch(err=>{res.status(400).send(err)});
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

//-----------FUNCIONES-----------
// SET QUANTITY
server.put('/:UserId/cantidad/:id', (req, res) => {
  let userId = req.params.UserId
  let id = req.params.id
  const { quantity } = req.body

  Carrito.update({ quantity }, { where: { userId, id } })
    .then(orden=>{res.status(201).send(orden)})
    .catch(err=>{res.status(400).send(err)
    })
})

module.exports = server;