require('dotenv').config()
const express = require('express')

// Routes
const indexRoutes = require('./route/index')
const userRoutes = require('./route/user')
const authRoutes = require('./route/auth')
const postsRoutes = require('./route/post')

const app = express()
const HOSTNAME = process.env.HOSTNAME || '0.0.0.0'
const PORT = process.env.PORT || 5000

/*await db.sync({
    force: true,
    alter: false,
})*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', indexRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/post', postsRoutes)

const server = app.listen(PORT, HOSTNAME,() => {
    console.log(`Server started on port: ${HOSTNAME}/${PORT}`)
})