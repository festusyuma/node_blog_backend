require('dotenv').config()
const express = require('express')
const sq = require('sequelize')
const db = require('./config/db')

// Routes
import authRoutes from './route/auth.js'

const { DataTypes, Model, Op } = sq
const app = express()
const PORT = process.env.PORT || 5000

try {
    await db.authenticate()
    console.log('connection established')
} catch(err) {
    console.error('Unable to connect to the database:', err);
}

/*await db.sync({
    force: true,
    alter: false,
})*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})