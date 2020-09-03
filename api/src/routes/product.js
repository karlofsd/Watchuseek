const server = require('express').Router();
const { Product, Categories } = require('../db.js');
const { Sequelize:{Op}} = require('sequelize');




server.get('/', (req, res, next) => {
	
	Product.findAll()
		.then(products => {
			res.send(products);
			console.log(products);
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

server.put("/category/:id", (req,res) => {
	const categoriaId = req.params.id;
	const nombre = req.body.nombre;
	const descripcion = req.body.descripcion;
	Categories.update({name: nombre, description: descripcion}, {where: {id:categoriaId}});
	res.status(201).send("La categoria se modificò");
});

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

server.post('/',(req,res)=>{
	const {name,description,price,stock,image} = req.body;
	Product.findOrCreate({where:{name,description,price,stock,image}})
	.then(product=>res.status(201).json(product))
	.catch(error=>res.status(400).json(error))
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



module.exports = server;
