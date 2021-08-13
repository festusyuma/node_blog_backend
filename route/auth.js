const express = require('express')
const router = express.Router()

const service = require('../service/AuthService')

router.post('/login', (req, res) => {
    const { status, message, data } = service.login(req.body)
    return res.status(status).json({ message, data })
})

module.exports = router