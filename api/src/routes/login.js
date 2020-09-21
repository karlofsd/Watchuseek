require('dotenv').config();
const server = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SIGNATURE } = process.env;
const {verifyToken , verifyAdmin} = require('../middlewares/authentication.js')
// Modelo user
const { Users } = require('../db');

// Login: Normal
server.post('/login', (request, response) => {

  const { username, password } = request.body;

  // Buscar usuario
  Users.findOne({
    where: {
      username
    }
  })
    .then(user => {
      
      // Verifico que el usuario existe en la BD
      if (!user) {
        return response.status(400).json({
          mensaje: '(Usuario) o contraseña incorrectos.'
        });
      }

      // Verifico que la contraseña coincida con la almacenada en la BD
      if (!bcrypt.compareSync(password, user.password)) {
        return response.status(400).json({
          mensaje: 'Usuario o (contraseña) incorrectos.'
        });
      }

      //Genero el token
      const token = jwt.sign({
        user: {
          id_user: user.id,
          mail: user.email,
          admin: user.isAdmin
        }
      }, SIGNATURE, { expiresIn: 60 * 60 * 24  });
      
      // Devolver el token
      return response.status(200).json({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        mensaje: 'Token generado',
        token
      });

    })
    .catch(error => {
      // Se rompio el servidor
      return response.status(500).json({
        mensaje: error
      });
    })

});

// VALIDATE  LOGUED USER
server.get('/me', verifyToken, (request, response) => {

  const {id_user} = request.user;

  Users.findOne({
    where: {
      id: id_user      
    }
  })
  .then(user => {
    return response.json({
      user
    });
  })
  .catch(error => {
    return response.status(400).json({
      error
    });
  })

});

// CONVERT NORMAL USER TO ADMIN. 
server.put('/promote/:id',[verifyToken, verifyAdmin],(req,res) =>{
  const {id} = req.params;
  const {status} = req.body;
  Users.update({isAdmin: !status ? true : false},{where:{id:id}})
  .then(user => res.status(204).json('usuario updateado!'))
  .catch(error => res.status(400).json(error))
});



module.exports = server;