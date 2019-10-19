/**
 * Reads data from .env
 */
require('dotenv').config()

const package = require('../package.json');

const CONFIG = {
  APP_NAME: package.name,
  APP_VERSION: package.version,
  ENVIRONMENT: process.env.ENVIRONMENT || 'ENVIRONMENT',
  SERVER_PORT: process.env.SERVER_PORT || 'SERVER_PORT',
  DB_DIALECT: process.env.DB_DIALECT || 'DB_DIALECT',
  DB_HOST: process.env.DB_HOST || 'DB_HOST',
  DB_PORT: process.env.DB_PORT || 'DB_PORT',
  DB_NAME: process.env.DB_NAME || 'DB_NAME',
  DB_USER: process.env.DB_USER || 'DB_USER',
  DB_PASSWORD: process.env.DB_PASSWORD || 'DB_PASSWORD',
  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'JWT_ENCRYPTION',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || 'JWT_EXPIRATION',
}

module.exports = CONFIG