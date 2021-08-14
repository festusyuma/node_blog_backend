const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const service = require('../service/authService')

router.post('/register', async (req, res) => {
    const { status, message, data } = await service.register(req.body)
    return res.status(status).send({ message, data })
})

router.post('/login', async (req, res) => {
    const { status, message, data } = await service.login(req.body)
    return res.status(status).send({ message, data })
})

router.get('/verify', auth, async (req, res) => {
    const { status, message, data } = await service.getUser(req.user)
    return res.status(status).send({ message, data })
})

module.exports = router