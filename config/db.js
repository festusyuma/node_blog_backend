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

try {
    await db.authenticate()
    console.log('connection established')
} catch(err) {
    console.error('Unable to connect to the database:', err);
}

module.exports = db