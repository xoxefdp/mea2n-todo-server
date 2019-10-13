const CONFIG = require('./config/config') // instantiate configuration variables

console.log('Environment: ', CONFIG.app)

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
// const expressJwt = require('express-jwt')

const v1 = require('./routes/v1')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * DATABASE
 */
const db = require('./models/models')
console.log('MongoDB settings: ', db)

/**
 * CORS: This is CORS-enabled for all origins!
 */
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

/**
 * Secured API
 */
// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
// app.use(expressJwt({
//   secret: 'qwerasdfzxcv',
//   getToken: function (req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   }
// }).unless({ path: ['/login', '/register'] }))

/**
 *  ROUTES
 */
app.use('/', v1)

app.use('/', (req, res, next) => {
  res.statusCode = 200
  res.json({ status: 'success', message: 'Parcel Pending API', data: {} })
})

/**
 * CATCH 404 and forward to error handler
 */
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/**
 * ERROR Handler
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.locals.message = err.message
  // res.render('error')
})

module.exports = app
