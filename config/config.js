require('dotenv').config()

const dbParams = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || 'postgres'
}

module.exports = {
  development: dbParams,
  test: dbParams,
  production: dbParams,
}