const express = require('express')
const router = express.Router()
const service = require('../service/UserService')

router.post('/save', async (req, res) => {
    const { status, message, data } = await service.save(req.body)
    return res.status(status).send({ message, data })
})

module.exports = router