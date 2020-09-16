require('dotenv').config();
const server = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SIGNATURE } = process.env;
// Modelo user
const { Users } = require('../db');

// Login: Normal
server.post('/login', (request, response) => {

  const { email, password } = request.body;

  // Buscar usuario
  Users.findOne({
    where: {
      email
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
          mail: user.email
        }
      }, SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 });

      // Devolver el token
      return response.status(200).json({
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

module.exports = server;