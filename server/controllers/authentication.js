const User = require('../models/user')

// /signup
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

      res.json({ success: 'true' })
    })
  })
}