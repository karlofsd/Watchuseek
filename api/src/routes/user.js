const server = require('express').Router();
const { Users } = require('../db.js');
const { Carrito } = require('../db.js');
const { Sequelize: { Op } } = require('sequelize');


server.post("/", (req, res) => {
  const { email, password } = req.body
  Users.create(
    { email, password }
  )
    .then(user => {
      return res.status(201).send(user)
    })
    .catch(error => {
      return res.status(404).json(error)
    })

})

server.get("/", (req, res) => {
  Users.findAll()
    .then(users => {
      return s.status(201).send(users)
    })
    .catch(err => {
      return res.status(404).send(err)
    })
})




server.get("/:email", (req, res) => {
  const email = req.params.email;
  Users.findOne({where:{email}})
    .then(user => {
      return res.status(201).send(user)
    })
    .catch(err => {
      return res.status(404).send(err)
    })
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
  const { name, price, quantity, status } = req.body;

  Carrito.findOrCreate({ where: { userId: id, name, price, quantity, status } })
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

server.get("/:UserId/admin", (req, res) => {
   var id = req.params.UserId
  
  Carrito.findAll({
     where: {
        userId: id,
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
      userId, id}})
    .then(orden => {
      res.status(201).send('Se ha vaciado el carrito')
    })
    .catch(err => {
      console.log(err)
      res.status(404).send('Hubo un error')
    })
})

// server.put('/:UserId/carrito/:id', (req, res) => {

//   let userId = req.params.UserId
//   let id = req.params.id
//   const { status } = req.body

//   Carrito.update({ 
//     [Op.or]:[
//       {status:'carrito',where:{status:null}},
//       {status:'procesando',where:{status:'carrito'}}
//     ]
//    }, { where: { userId, id } })
//     .then(orden => {
//       res.status(201).send(orden)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(404).send(err)
//     })
// })




// server.put('/:UserId/carrito/:id',(req, res) => {

//   let userId = req.params.UserId
//   let id = req.params.id
//   let data;
//   Carrito.findOne({where:{userId: userId, id: id}})
//   .then(e =>{
//     data = e;
//   });
//   switch (data.status) {
//     case "carrito":
//        Carrito.update({status: "procesando"},{where: {userId:userId, id:id}})
//        .then(e => {
//          res.status(201).send(e);
//        })
//       break;
  
//     default:
//       break;
//   }

// })


server.put('/:UserId/carrito/:id', (req, res) => {

  let userId = req.params.UserId
  let id = req.params.id
  const { status } = req.body

  Carrito.update({ status: "creada" }, { where: { userId, id } })
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


server.put('/:UserId/carrito/:id', (req, res) => {
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

server.get('/:id/orders', async (request, response) => {
  const { id } = request.params;

  const orders = await Carrito.findAll({
    where: {
      userId: id
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








module.exports = server;