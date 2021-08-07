const express = require('express')
const User = require('../Model/User')
const AuthService = require('../Service/AuthService')

const router = express.Router()
const service = new AuthService()

router.post('/login', (req, res) => {
    const { status, message, data } = service.login(req.body)
    return res.status(status).json({ message, data })
})

module.exports = router