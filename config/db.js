const { Sequelize } = require('sequelize')

const host = process.env.DB_HOST
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const db = new Sequelize(dbName, username, password, {
    host,
    dialect: 'mysql',
    logging: console.log,
    freezeTableName: true,
});

module.exports = db