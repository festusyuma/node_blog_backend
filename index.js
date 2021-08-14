require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Routes
const indexRoutes = require('./route/index')
const authRoutes = require('./route/auth')
const postsRoutes = require('./route/post')

const app = express()
const HOSTNAME = process.env.HOSTNAME || '0.0.0.0'
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', indexRoutes)
app.use('/auth', authRoutes)
app.use('/post', postsRoutes)

app.listen(PORT, HOSTNAME,() => {
    console.log(`Server started on port: ${HOSTNAME}/${PORT}`)
})