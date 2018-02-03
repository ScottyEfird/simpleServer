const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Config Local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify user/pass
  User.findOne({ email }, (error, user) => {
    
    if (error) return done(error)

    if (!user) return done(null, false)
    user.comparePassword(password, (error, isMatch) => {
      if (error) return done(error)
      if (!isMatch) return done(null, false)
      return done(null, user)
    })
  })
})

// Config JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET
}

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, (error, user) => {
    if (error) return done(error, false)
    
    if (user) done(null, user)
    else done(null, false)
  })
})

passport.use(jwtLogin)
passport.use(localLogin)