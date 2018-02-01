const express = require('express')
const http = require('http')
const bodyParser = require('body-Parser')
const morgan = require('morgan')
const router = require('./router')
const app = express()

// Express Middleware
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)

server.listen(port)
console.log('Server running on:', port)