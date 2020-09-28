const server = require('express').Router();
const { Product, Reviews } = require('../db.js');
const { Sequelize:{Op}} = require('sequelize');
const { verifyToken, verifyAdmin } = require ('../middlewares/authentication');

// GET ALL PRODUCTS
server.get('/', (req, res) => {
	Product.findAll()
	.then(products => {	
		res.status(200).json(products);
	})
	.catch(error => {
		res.status(404).json(error);
	});
});

// GET PAGINATION
server.get('/page/:page', (req, res) => {
	let {page} = req.params
	let {categoryId,name} = req.query

	if(categoryId || name ){
		
		Product.findAndCountAll({limit:8,offset:(page-1)*8,
			where:{
				[Op.or]:[
					{name: {
						[Op.like]: `%${name}%`,
					}},
					{description: {
						[Op.substring]: `${name}`,
					}},
					{categoryId:Number(categoryId)||0}]
				}
			}
		)
		.then(products => {	
			console.log(products)
			res.status(200).json(products);
		})
		.catch(error => {
			res.status(404).json(error);
		});
	}else{
		Product.findAndCountAll({limit:6,offset:(Number(page)-1)*6})
		.then(products => {	
			console.log(products)
			res.status(200).json(products);
		})
		.catch(error => {
			res.status(404).json(error);
		});
	}
});

// GET PRODUCT BY ID
server.get('/:id',(req,res) => {
	Product.findByPk(req.params.id)
	.then(product => {
		res.status(200).json(product)
	}).catch(error => {
		res.status(404).send(error)
	})
})

// GET PRODUCTS BY CATEGORY 
server.get('/category/:category',(req,res) => {
	Product.findAll({
		where:{categoryId:Number(req.params.category)} //El atributo category(foreing Key) depende del asignado a los modelos de BD o si esta asociado(belongsto)
	}).then(products => {
		res.status(200).json(products)
	}).catch(error => {
		res.status(404).send(error)
	})
})

// GET PRODUCTS BY TEXT (SEARCHBAR)
server.get('/find/search',(req,res) => {
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
		res.status(200).send(products)}
	).catch(error =>{ 
		res.status(404).send(error)
	})
})

// CREATE PRODUCT (ADMIN)
server.post('/', [verifyToken, verifyAdmin],(req,res) => {
	const {name,description,price,stock,image} = req.body;
	Product.create({name,description,price,stock,image})
	.then(product=>res.status(201).json(product))
	.catch(error=>{
		console.log(error.message)
		res.status(400).json(error)
	})
})

// DELETE PRODUCT (ADMIN)
server.delete('/:id',[verifyToken, verifyAdmin],(req,res)=>{
	const {id} = req.params;
	Product.destroy({where:{id}})
	.then(()=>res.status(204).send('Eliminado'))
	.catch(error=>res.status(400).send(error))
})

// UPDATE PRODUCT (ADMIN)
server.put('/:id',[verifyToken, verifyAdmin],(req,res) => {
	const {id} = req.params;
	const {name,description,price,stock,image} = req.body;
	Product.update({name,description,price,stock,image},{where:{id}})
	.then(product=>res.status(204).send(product))
	.catch(error=>res.status(400).send(error))
})

// ADD/UPDATE CATEGORY TO PRODUCT (ADMIN)
server.post('/:id/category/:categoryId',[verifyToken, verifyAdmin],(req, res) => {
	const {id,categoryId} = req.params;
	console.log(id)
	console.log(`id ruta : ${categoryId}`)
	Product.update ({categoryId},{where: {id}})
	.then(() =>{
		console.log(`respuesta`)
		res.status(201).send('La categoria fue modificada');
	})
	.catch((err)=>{
      res.status(400).send(err)
	})
}); 

// UPDATE STOCK TO PRODUCT
server.put('/mod/:id',(req,res)=>{
	const {id}=req.params;
	const {stock} = req.body;
	console.log("----------------------------------")
	console.log("id:" +id + "-" + " stock:" + stock )
	console.log(req.body);
	console.log("-------------------------------")
	Product.update({stock},{where:{id}})
	.then(product=>res.status(204).send(product))
	.catch(error=>res.status(400).send(error))
})


/* server.delete('/:idProducto/category/:idCategoria',(req, res) => {
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
 */

module.exports = server;
