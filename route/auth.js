const express = require('express')
const router = express.Router()

const service = require('../service/AuthService')

router.post('/register', async (req, res) => {
    const { status, message, data } = await service.register(req.body)
    return res.status(status).send({ message, data })
})

router.post('/login', async (req, res) => {
    const { status, message, data } = await service.login(req.body)
    return res.status(status).send({ message, data })
})

router.post('/verify', async (req, res) => {
    const { status, message, data } = await service.getUser(req.body)
    return res.status(status).send({ message, data })
})

module.exports = router