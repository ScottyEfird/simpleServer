const express = require('express')
const http = require('http')
const bodyParser = require('body-Parser')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')
const app = express()

//Mongodb setup
try {
  mongoose.connect('mongodb://localhost/simpleserver')
} catch(error) {
  console.log('ERROR connecting to MongoDb:', error)
}

// Express Middleware
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)

server.listen(port)
console.log('>SERVER IS RUNNING ON PORT:', port)