const config = require('../config')
const User = require('../models/user')
const jwt = require('jwt-simple')

function handleCreateToken(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.SECRET)
}

exports.signin = function(req, res, next) {
  // Send token to user if user is authenticated
  res.send({ token: handleCreateToken(req.user) })
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email }, (error, response) => {
    if (error) return next(error)

    if (response) return res.status(422).send({ error: 'Email already exists'})
    if (!email || !password) return res.status(422).send({ error: 'Email and password are required parameters' })

    const user = new User({
      email,
      password
    })
    
    user.save((error, response) => {
      if(error) return next(error)

      res.json({ token: handleCreateToken(user) })
    })
  })
}