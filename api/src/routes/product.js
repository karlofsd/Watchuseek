const server = require('express').Router();
const { Product } = require('../db.js');
const { Sequelize:{Op}} = require('sequelize');


server.get('/', (req, res, next) => {
	
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(error => {
			res.status(400).json({
				error
			});
		});
		
});

server.get('/category/:category',(req,res) => {
	Product.findAll({
		where:{categoryId:Number(req.params.category)} //El atributo category(foreing Key) depende del asignado a los modelos de BD o si esta asociado(belongsto)
	}).then(products => {
		res.json(products)
	}).catch(error => {
		res.status(400).send(error)
	})
})

server.get('/search',(req,res) => {
	Product.findAll({
		where: {
			[Op.or]: {
			  name: {
				[Op.like]: `%${req.query.name}%`,
			  },
			  description: {
				[Op.substring]: `${req.query.name}`,
			  }
			}
		  }
	}).then(products => {
		res.json(products)
	}).catch(error => {
		res.status(400).send(error)
	})
})

server.post('/',(req,res)=>{
	const {name,description,price,stock,image} = req.body;
	Product.findOrCreate({
		where:{name,description,price,stock,image}
	})
	.then(product=>res.status(201).json(product))
	.catch(error=>res.status(400).json(error))
})

server.get('/:id',(req,res) => {
	Product.findByPk(req.params.id)
	.then(product => {
		res.json(product)
	}).catch(error => {
		res.status(400).send(error)
	})
})

server.delete('/:id',(req,res)=>{
	let id=req.params.id;
	Product.destroy({where:{id}})
	.then(()=>res.status(201).send('Eliminado'))
	.catch(error=>res.status(400).send(error))
})


server.put('/:id',(req,res)=>{
	let id=req.params.id;
	const {name,description,price,stock,image} = req.body;
	Product.update({name,description,price,stock,image},{where:{id}})
	.then(product=>res.status(200).send(product))
	.catch(error=>res.status(400).send(error))
})

server.put('/mod/:id',(req,res)=>{
	let id=req.params.id;
	const {stock} = req.body;
	Product.update({stock},{where:{id}})
	.then(product=>res.status(200).send(product))
	.catch(error=>res.status(400).send(error))
})

server.delete('/:idProducto/category/:idCategoria', (req, res) => {
	  var idProducto = req.params.idProducto;
	  var idCategoria = req.params.idCategoria;
	  if(!idProducto){
		  return res.status(404).send("No fue enviado el producto");
		}
		if(!idCategoria){
		  return res.status(404).send("No fue enviada la categoria");
		}
	  Product.update (
		  {categoryId: null},
		  {where: {id:idProducto}}
		  )
		  .then(()=>{
			res.status(201).send('La categoria fue eliminada');
		  })
		  .catch((err)=>{
			  res.status(400).send(err)
		  })

	  });

server.post('/:idProducto/category/:idCategoria', (req, res) => {
	var idProducto = req.params.idProducto;
	var idCategoria = req.params.idCategoria;
	Product.update (
		{categoryId: idCategoria},
		{where: {id:idProducto}}
	)
	.then(() =>{
		res.status(201).send('La categoria fue modificada');
	})
	.catch((err)=>{
      res.status(400).send(err)
	})
});

module.exports = server;
