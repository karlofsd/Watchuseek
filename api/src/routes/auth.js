require('dotenv').config();
const server = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken, verifyAdmin } = require('../middlewares/authentication.js')
const { CLIENT_ID, SIGNATURE, RESET_PASSWORD_KEY, APIKEY_MAILGUN, DOMAIN_MAILGUN, CLIENT_URL } = process.env;
const mailgun = require('mailgun-js')({ apiKey: APIKEY_MAILGUN, domain: DOMAIN_MAILGUN });
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

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

      // Verifico que el usuario existe y comparo las contraseñas 
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return response.status(400).json({
          error: 'Usuario o contraseña incorrectos.'
        });
      }

      //Genero el token
      const token = jwt.sign({
        user: {
          id_user: user.id,
          mail: user.email,
          username: user.username,
          admin: user.isAdmin,
          password: user.password
        }
      }, SIGNATURE, { expiresIn: 60 * 60 * 24 });

      // Devolver el token
      return response.status(200).json({
        isAdmin: user.isAdmin,
        mensaje: 'Token generado',
        token
      });

    })
    .catch(error => {
      // Se rompio el servidor
      return response.status(500).json({
        error: error.message
      });
    })

});

// Forgot Password
server.put('/forgot-password', (req, res) => {

  const { email } = req.body;

  // Buscar usuario en la BD
  Users.findOne({
    where: {
      email
    }
  })
    .then(user => {

      // Validar que el usuario existe en la BD
      if (!user) {
        return res.status(400).json({
          error: `No existe un usuario con el mail: ${email}`
        });
      }

      // Usuario verificado, generar el token
      const token = jwt.sign({
        id: user.id
      }, RESET_PASSWORD_KEY, { expiresIn: '20m' });

      // Generar mensaje
      const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: `${email}`,
        subject: 'Recuperar contraseña',
        template: 'forgot-password',
        'h:X-Mailgun-Variables': JSON.stringify({
          'url_forgot_password': `${CLIENT_URL}/resetpassword/${token}`
        })
      }

      // Actualizar usuario y agregar token dentro del campo 'resetLink'
      Users.update({
        resetLink: token
      }, {
        where: {
          id: user.id
        }
      })
        .then(userUpdated => {

          // Verificar que se actualice el usuario
          if (!userUpdated[0]) {
            return res.status(400).json({
              error: 'No se guardo token para resetear password del usuario.'
            });
          } else {

            // Token guardado (User actualizado) , enviar correo al email
            mailgun.messages().send(data, (error, body) => {

              if (error) {
                return res.status(500).json({
                  error: error.message
                });
              }

              // Correo enviado al email del user
              return res.status(200).json({
                message: `Se envió un correo al email del usuario: ${user.username}`
              });

            });

          }

        })
        .catch(error => {
          return res.status(500).json({
            error: error.message
          });
        })

    })
    .catch(error => {
      return res.status(500).json({
        error: error.message
      });
    })

});

// Reset password
server.put('/reset-password', (req, res) => {

  const { resetLink, newPassword } = req.body;

  // Verificar que el token exista en el body
  if (resetLink) {

    // Verificar token
    jwt.verify(resetLink, RESET_PASSWORD_KEY, (error, payload) => {

      if (error) {
        return res.status(401).json({
          error: 'Token no válido o expirado.'
        });
      }

      // Verificar que el usuario exista con el 'token' (resetLink) en la BD 
      Users.findOne({
        where: {
          resetLink
        }
      })
        .then(user => {

          if (!user) {
            return res.status(400).json({
              error: 'No existe un usuario con este token.'
            });
          }

          // El usuario existe , cambiar contraseña y eliminar token
          Users.update({
            password: bcrypt.hashSync(newPassword, 10),
            resetLink: ''
          }, {
            where: {
              id: payload.id
            }
          })
            .then(userUpdated => {

              if (!userUpdated[0]) {
                return res.status(400).json({
                  error: 'Error al cambiar tu password.'
                });
              }

              // Se actualizo la password del usuario  
              return res.status(200).json({
                message: `El usuario: ${user.username} , ha cambiado la password correctamente.`
              });

            })
            .catch(error => {
              return res.status(500).json({
                error: error.message
              });
            })

        })
        .catch(error => {
          return res.status(500).json({
            error: error.message
          });
        })

    });

  } else {
    return res.status(401).json({
      error: 'Error de autenticación , token no enviado'
    });
  }

});

// Validar token de google
async function verify(token) {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  });

  const payload = ticket.getPayload();

  // Nuevo user
  return {
    username: payload.name,
    email: payload.email,
    image: payload.picture,
    google: true
  }

}

// Login with Google
server.post('/google', async (req, res) => {

  const token = req.body.token;

  const googleUser = await verify(token)
    .catch(error => {
      return res.status(403).json({
        error: error.message
      });
    })


  Users.findOne({
    where: {
      email: googleUser.email
    }
  })
    .then(user => {

      // Verificar que el usuario existe en la BD.
      if (user) {

        // Si el user se autentico con Login normal
        if (!user.google) {

          return res.status(400).json({
            message: 'Debes usar su autenticacion normal.'
          });

        } else {
          // Generar el token
          const token = jwt.sign({
            user: user
          }, SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 })

          // usuario logueado con google, retornar token
          return res.status(200).json({
            user: user,
            token
          });

        }

      } else {

        // Si el usuario no existe en la BD agregarlo y devolver token
        Users.create({
          username: googleUser.username,
          email: googleUser.email,
          image: googleUser.image,
          google: true,
          password: 'random-password'
        })
          .then(userCreated => {

            // Generar token del userGoogle
            const token = jwt.sign({
              user: userCreated
            }, SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 });

            // Usuario registrado 
            return res.status(201).json({
              user: userCreated,
              token
            });

          })
          .catch(error => {
            return res.status(500).json({
              error: error.message
            });
          })

      }

    })
    .catch(error => {
      return res.status(500).json({
        error: error.message
      });
    })

})

// GET A LOGUED USER
server.get('/me', verifyToken, (request, response) => {

  const { id_user } = request.user;

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
server.put('/promote/:id', [verifyToken, verifyAdmin], (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  Users.update({ isAdmin: !status ? true : false }, { where: { id: id } })
    .then(user => res.status(204).json('usuario updateado!'))
    .catch(error => res.status(400).json(error))
});

module.exports = server;
