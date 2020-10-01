const server = require('express').Router();
const { Reviews, Users, Product } = require('../db');
const { verifyToken, verifyAdmin } = require ('../middlewares/authentication');
const { Sequelize } = require('sequelize');

// CREATE REVIEW (ADMIN)
server.post('/:productId/user/:userId',(req,res)=>{
    const {productId,userId} = req.params
	const {comentarios, stars} = req.body

    Reviews.findOrCreate({where:{
		comentarios, 
		stars,productId,userId}})
		
    .then(review=>{
        res.status(201).send(review)
    })
    .catch(err=>{
		console.log(err)
        res.status(404).send(err)
    })
})

//GET REVIEWS BY PRODUCT
server.get('/:productId', (req, res) => {
	let {productId} = req.params

	Reviews.findAll({
		where: {productId},
		attributes:['id','comentarios','stars','createdAt'],
		include:[{
			model: Users,
			attributes:['username']
		}]
	})  
	.then(response => {
		res.status(201).send(response)
	}) 
	.catch(err => {
		console.log(err)
		res.status(404).send("No se ha encontrado el producto", err)
	})
}) 

//DELETE REVIEW BY ID
server.delete('/:id', (req, res) => {
	const {id} = req.params

	  Reviews.destroy ({where:{
		id
	}})
	.then (response => {
		res.status(200).send("La review fue eliminada")
	})
	.catch (err => {
		res.status(404).send(err)
	})
})

module.exports = server;