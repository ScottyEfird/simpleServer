const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})


userSchema.pre('save', function(next) {
  const user = this

  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error)
    
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) return next(error)
      
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(attemptPassword, callback) {
  bcrypt.compare(attemptPassword, this.password, function(error, isUser) {
    if (error) return callback(error)

    callback(null, isUser)
  })
}

const model = mongoose.model('user', userSchema)

module.exports = model