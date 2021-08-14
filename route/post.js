const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const service = require('../service/postService')

router.get('/', auth, async (req, res) => {
  const { status, message, data } = await service.getPosts()
  return res.status(status).send({ message, data })
})

router.get('/:id', auth, async (req, res) => {
  const { status, message, data } = await service.getPost(req.params.id)
  return res.status(status).send({ message, data })
})

router.post('/', auth, async (req, res) => {
  const { status, message, data } = await service.addPost(req.body, req.user)
  return res.status(status).send({ message, data })
})

router.delete('/:id', auth, async (req, res) => {
  const { status, message, data } = await service.deletePost(req.params.id, req.user)
  return res.status(status).send({ message, data })
})

module.exports = router