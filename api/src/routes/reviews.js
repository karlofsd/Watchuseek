const server = require('express').Router();
const { Reviews } = require('../db.js');
const { verifyToken, verifyAdmin } = require ('../middlewares/authentication');

// CREATE REVIEW (ADMIN)
server.post('/:productId/user/:userId',[verifyToken, verifyAdmin],(req,res)=>{
    const {productId,userId} = req.params
	const {comentarios, stars } = req.body

    Reviews.findOrCreate({where:{
		productId,
		userId,
		comentarios, 
		stars
    }})
    .then(newReview=>{
        res.status(201).send(newReview)
    })
    .catch(err=>{
		console.log(err)
        res.status(404).send(err)
    })
})

// GET REVIEWS BY PRODUCT
server.get('/product/:productId', (req, res) => {
	const productId = req.params

	Reviews.findAll({where:{
		productId
	}})
	.then(reviews => {
		res.status(200).send(reviews)
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