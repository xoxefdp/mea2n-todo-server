const CONFIG = require('../config/config')

const mongoose = require('mongoose')
// const Task = require('./tasks')
// const User = require('./users')

if (CONFIG.DB_HOST !== '') {
  /**
   * MONGODB Connection point
   */
  let connectionUri = 'mongodb://' + CONFIG.DB_HOST + ':' + CONFIG.DB_PORT + '/' + CONFIG.DB_NAME

  /**
   * ENABLE Mongoose to return Promises
   */
  mongoose.Promise = global.Promise

  const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(connectionUri,
      {
        useMongoClient: true,
        autoIndex: false, // Don't build indexes
        reconnectTries: 30, // Retry up to 30 times
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
      }
    ).then(
      () => {
        console.log('MongoDB is connected')
      }
    ).catch(
      (err) => {
        console.log(err, connectionUri)
        setTimeout(connectWithRetry, 5000)
      }
    )
  }

  connectWithRetry()

  let db = mongoose.connection
  module.exports = db

  // db.once('open', () => {
  //   console.log('Connected to MongoDB with mongoose version ' + mongoose.version + ' on ' + connectionUri)
  // })

  // db.on('error', (error) => {
  //   console.log('error', error)
  // })
} else {
  console.log('No MongoDB credentials given')
}

module.exports.models = mongoose
