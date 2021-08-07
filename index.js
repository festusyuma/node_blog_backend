require('dotenv').config()
const express = require('express')
const sq = require('sequelize')
const db = require('./config/db')

// Routes
const authRoutes = require('./route/auth')

const app = express()
const HOSTNAME = process.env.HOSTNAME || '0.0.0.0'
const PORT = process.env.PORT || 5000

/*await db.sync({
    force: true,
    alter: false,
})*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/auth', authRoutes)

const server = app.listen(PORT, HOSTNAME,() => {
    console.log(`Server started on port: ${HOSTNAME}/${PORT}`)
})