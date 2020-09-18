const server = require('express').Router();
const { Product, Reviews } = require('../db.js');
const { Sequelize:{Op}} = require('sequelize');
const { verifyToken, verifyAdmin } = require ('../middlewares/authentication');

// GET ALL PRODUCTS
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

// GET PRODUCTS BY CATEGORY 
server.get('/category/:category',(req,res) => {
	Product.findAll({
		where:{categoryId:Number(req.params.category)} //El atributo category(foreing Key) depende del asignado a los modelos de BD o si esta asociado(belongsto)
	}).then(products => {
		res.json(products)
	}).catch(error => {
		res.status(400).send(error)
	})
})

// GET PRODUCTS BY TEXT (SEARCHBAR)
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

// CREATE PRODUCT (ADMIN)
server.post('/', [verifyToken, verifyAdmin],(req,res)=>{
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

// DELETE PRODUCT (ADMIN)
server.delete('/:id',[verifyToken, verifyAdmin],(req,res)=>{
	let id=req.params.id;
	Product.destroy({where:{id}})
	.then(()=>res.status(201).send('Eliminado'))
	.catch(error=>res.status(400).send(error))
})

// UPDATE PRODUCT (ADMIN)
server.put('/:id',[verifyToken, verifyAdmin],(req,res)=>{
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


server.delete('/:idProducto/category/:idCategoria',(req, res) => {
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


// ADD/UPDATE CATEGORY TO PRODUCT (ADMIN)
server.post('/:idProducto/category/:idCategoria',[verifyToken, verifyAdmin],(req, res) => {
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

//----------------------> REVIEWS <--------------------------

server.post('/:id/review/:userId', (req,res)=>{
    const id = req.params.id
    const iduser = req.params.userId
	const {comentarios, stars } = req.body

    Reviews.findOrCreate({where:{
		productId:id,
		userId: iduser,
		comentarios, 
		stars
    }})
    .then(response=>{
        res.status(201).send(response)
    })
    .catch(err=>{
		console.log(err)
        res.status(404).send(err)
    })
})

//GET /product/:id/review/
server.get('/:id/review/', (req, res) => {
	let id = req.params.id

	Reviews.findAll({where:{
		productId: id
	}})
	.then(response => {
		res.status(201).send(response)
	})
	.catch(err => {
		console.log(err)
		res.status(404).send("No se ha encontrado el producto", err)
	})
})

//DELETE /product/:id/review/:idReview
server.delete('/review/:idReview', (req, res) => {
	let idReview = req.params.idReview

	  Reviews.destroy ({where:{
		id: idReview
	}})
	.then (response => {
		res.status(201).send("La review fue eliminada")
	})
	.catch (err => {
		res.status(404).send(err)
	})
})



module.exports = server;
