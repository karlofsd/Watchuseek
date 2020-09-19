const server = require('express').Router();
const { Reviews, Users } = require('../db');
const { verifyToken, verifyAdmin } = require ('../middlewares/authentication');
const { Sequelize } = require('sequelize');

// CREATE REVIEW (ADMIN)
server.post('/:productId/user/:userId',(req,res)=>{
    const {productId,userId} = req.params
	const {comentarios, stars} = req.body

	var username = Users.username
console.log(Users.username)

    Reviews.findOrCreate({where:{
		userId,
		productId,
		username,
		comentarios, 
		stars,
	}})

	// var values = { slack_id: profile.id, name: profile.user };
	// var selector = { where: { slack_id: profile.id } };
	// User.findOrCreate(values, selector)
	// 			.then(function() {
	// 				return done(err, user);
	// 			});
    .then(newReview=>{
        res.status(201).send(newReview)
    })
    .catch(err=>{
		console.log(err)
        res.status(404).send(err)
    })
})

// return Product.create({
// 	title: 'Chair',
// 	user: {
// 	  firstName: 'Mick',
// 	  lastName: 'Broadstone',
// 	  addresses: [{
// 		type: 'home',
// 		line1: '100 Main St.',
// 		city: 'Austin',
// 		state: 'TX',
// 		zip: '78704'
// 	  }]
// 	}
//   }, {
// 	include: [{
// 	  association: Product.User,
// 	  include: [ User.Addresses ]
// 	}]
//   });










// GET REVIEWS BY PRODUCT
// server.get('/:id/review/', (req, res) => {
// 	let id = req.params.id

// 	Reviews.findAll({where:{
// 		productId: id
// 	}},{
// 		include:[{
// 			association: Users,
// 			as: 'user',
// 			through: {
// 				attributes: [["username"]]
// 			  }
// 		}]
// 	})  
// 	.then(response => {
// 		res.status(201).send(response)
// 	}) 
// 	.catch(err => {
// 		console.log(err)
// 		res.status(404).send("No se ha encontrado el producto", err)
// 	})
// }) 

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