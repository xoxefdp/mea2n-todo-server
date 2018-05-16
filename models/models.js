const CONFIG = require('./config/config')

const mongoose = require('mongoose')
const Task = require('./tasks')
const User = require('./users')

const models = {
  Task,
  User
}

if (CONFIG.db_host !== '') {
  /**
   * MONGODB Connection point
   */
  const connectionUri = 'mongodb://' + CONFIG.db_host + ':' + CONFIG.db_port + '/' + CONFIG.db_name

  /**
   * ENABLE Mongoose to return Promises
   */
  mongoose.Promise = global.Promise
  mongoose.connect(connectionUri, { useMongoClient: true }).catch((err) => {
    console.log(err, connectionUri)
  })

  let db = mongoose.connection
  module.exports = db

  db.once('open', () => {
    console.log('Connected to MongoDB with mongoose version ' + mongoose.version + ' on ' + connectionUri)
  })

  db.on('error', (error) => {
    console.log('error', error)
  })
} else {
  console.log('No MongoDB credentials given')
}

module.exports = models
