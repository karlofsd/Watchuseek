const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	
	Product.findAll()
		.then(products => {
			res.send(products);
			console.log(products);
		})
		.catch(next);
		
});

server.get('/:category',(req,res) => {
	Product.findAll({
		where:{categoriesId:Number(req.params.category)} //El atributo category(foreing Key) depende del asignado a los modelos de BD o si esta asociado(belongsto)
	}).then(products => {
		res.json(products)
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
