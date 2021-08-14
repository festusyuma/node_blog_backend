const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const service = require('../service/postService')


router.get('/:id', auth, async (req, res) => {
  const { status, message, data } = await service.getPost(req.params.id)
  return res.status(status).send({ message, data })
})

module.exports = router