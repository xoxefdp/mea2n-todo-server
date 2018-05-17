/**
 * Reads data from .env
 */
require('dotenv').config()

const CONFIG = {}

CONFIG.app = process.env.APP || 'APP'
CONFIG.port = process.env.PORT || 'PORT'
CONFIG.db_dialect = process.env.DB_DIALECT || 'DB_DIALECT'
CONFIG.db_host = process.env.DB_HOST || 'DB_HOST'
CONFIG.db_port = process.env.DB_PORT || 'DB_PORT'
CONFIG.db_name = process.env.DB_NAME || 'DB_NAME'
CONFIG.db_user = process.env.DB_USER || 'DB_USER'
CONFIG.db_password = process.env.DB_PASSWORD || 'DB_PASSWORD'
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'JWT_ENCRYPTION'
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || 'JWT_EXPIRATION'

module.exports = CONFIG
