require('dotenv').config();
const server = require('express').Router();
const { Carrito, Ordenfinal } = require('../db.js');
const { verifyToken } = require('../middlewares/authentication');
const { APIKEY_MAILGUN, DOMAIN_MAILGUN } = process.env;
const mailgun = require('mailgun-js')({ apiKey: APIKEY_MAILGUN, domain: DOMAIN_MAILGUN });

// GET ALL ORDERS
server.get('/', (req, res) => {
  const { status } = req.query;
  let condition = {
    where: {
      status
    }
  };

  Carrito.findAll(status && condition)
    .then(orders => res.status(200).json({
      orders
    }))
    .catch(error => res.status(400).json({
      error
    }))

});

// GET ONE ORDER
server.get('/:id', (req, res) => {
  const { id } = req.params;

  Carrito.findByPk(id)
    .then(orderFound => response.status(200).json({
      orderFound
    }))
    .catch(error => res.status(400).json({
      error
    }))

});

// UPDATE ORDER
server.put('/:id', (req, res) => {
  var id = req.params.id;
  const { name, price, quantity, status } = req.body;

  Carrito.update({ name, price, quantity, status }, { where: { id } })
    .then(respons => {
      res.status(201).send(respons)
    })
    .catch(err => {
      res.status(404).send('No se pudo completar con exito!')
    })
})

// ACTUALIZAR ESTADO DE ORDEN
server.put('/:order/changeStatus/:stat', (req, res) => {
  const cancel = req.query.cancel
  const stat = req.params.stat
  /* Carrito.findAll({where:{order:req.params.order}})
    .then(productos => {
      console.log(productos) */
  if (stat === 'carrito') {
    return Carrito.update({ status: 'creada' }, { where: { order: req.params.order, status: stat } })
      .then(() => res.status(201).send('orden creada'))
  } else if (stat === 'creada') {
    return Carrito.update({ status: 'procesando' }, { where: { order: req.params.order, status: stat } })
      .then(() => res.status(201).send('orden procesada'))
  } else if (stat === 'procesando') {
        /* if(cancel){
          return Carrito.update({status:'cancelado'},{where:{order:req.params.order}})
          .then(() => res.status(201).send('orden cancelada'))
        }
        else  */return Carrito.update({ status: 'completa' }, { where: { order: req.params.order, status: stat } })
      .then(() => res.status(201).send('orden completada'))
  } else return res.status(201).send('no hay ordenes pendientes')
  /* .catch(err => res.status(404).send(err)) */
})


// modelo contador
server.get('/counter/count', (req, res) => {
  Ordenfinal.findAll({
    limit: 1,
    order: [['id', 'DESC']]
  })
    .then(e => {
      res.status(200).send(e);
    })
});

server.post("/counter", (req, res) => {
  Ordenfinal.create({ contador: 0 })
    .then(e => {
      res.status(200).send(e);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

// SEND MESSAGE TO USER
server.post('/mail', verifyToken, (req, res) => {
  console.log('--mail--')
  // Obtener carrito y datos del usuario
  const carrito = req.body;
  const { username, email } = req.user;

  // Agregar propiedad 'total' a los productos
  const cartData = carrito.map(product => {
    product.total = product.price * product.quantity;
    return product;
  });

  let sumTotal = 0;

  // Calcular el total de la compra
  cartData.forEach((product) => {
    sumTotal += product.total;
  });

  // Fecha actual, formato d/m/a y hora h:m:s
  const date = new Date().toLocaleString().split(' ');

  // Configuracion del mensaje y la plantilla
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: `${email}`,
    subject: 'Facturación de compra',
    template: "billing-details-ecommerce",
    'h:X-Mailgun-Variables': JSON.stringify({
      "currentDate": date[0],
      "time": date[1],
      "username": username,
      "cart": cartData,
      "sumTotal": sumTotal
    })
  };

  // Enviar mensaje al correo
  mailgun.messages().send(data, (error, body) => {

    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }

    return res.status(200).json({
      body
    });

  });

})

module.exports = server;
