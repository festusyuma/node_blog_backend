import express from 'express'
import User from '../Model/User.js'
import AuthService from '../Service/AuthService.js'

const router = express.Router()
const service = new AuthService()

router.post('/login', (req, res) => {
    const { status, message, data } = service.login(req.body)
    return res.status(status).json({ message, data })
})

module.exports = router