const server = require('express').Router();
const { Users } = require('../db.js');

server.post("/", (req, res)=>{
  const {email, password} = req.body
    Users.findOrCreate({
        where: {email, password}
    })
    .then(user=>{
       return res.status(201).send(user)
    })
    .catch(error=>{
       return res.status(404).json(error)
    })
    
})

server.get("/" ,(req, res)=>{
    Users.findAll()
    .then(users=>{
       return res.status(201).send(users) 
    })
    .catch(err=>{
       return res.status(404).send(err)
    })
})

server.put("/:id", (req, res)=>{
   let id = req.params.id
   const {email, password} = req.body
   Users.update({email, password},{where:{id}})
   .then(users=>{
       return res.status(201).send(users)
   })
   .catch(err=>{
       return res.status(404).send(err)
   })



})

module.exports = server;