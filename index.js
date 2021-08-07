require('dotenv').config()
const express = require('express')
const sq = require('sequelize')
const db = require('./config/db')

// Routes
import authRoutes from './route/auth.js'

const app = express()
const PORT = process.env.PORT || 5000

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