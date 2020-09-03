const server = require('express').Router();
const { Product } = require('../db.js');
const { Sequelize:{Op}} = require('sequelize');




server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/category/:category',(req,res) => {
	Product.findAll({
		where:{categoriesId:Number(req.params.category)} //El atributo category(foreing Key) depende del asignado a los modelos de BD o si esta asociado(belongsto)
	}).then(products => {
		res.json(products)
	}).catch(error => {
		res.status(404).send(error)
	})
})

server.post('/create',(req,res) => {
	Product.findOrCreate({
		where:{
			name:req.body.name,
			description:req.body.description,
			stock:req.body.stock,
			price:req.body.price,
			image:req.body.image
		}
	}).then(product => {
		res.status(201).json(product)
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
		res.status(404).send(error)
	})
})

module.exports = server;
