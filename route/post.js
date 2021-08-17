const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const service = require('../service/postService')
const commentService = require('../service/commentService')

router.get('/', auth, async (req, res) => {
  const { status, message, data } = await service.getPosts(req.query.page, req.query.perPage, req.user)
  return res.status(status).send({ message, data })
})

router.get('/:id', auth, async (req, res) => {
  const { status, message, data } = await service.getPost(req.params.id, req.user)
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

router.get('/:id/like', auth, async (req, res) => {
  const { status, message, data } = await service.likePost(req.params.id, req.user)
  return res.status(status).send({ message, data })
})

router.post('/:id/comment', auth, async (req, res) => {
  const { status, message, data } = await commentService.addComment(req.params.id, req.body, req.user)
  return res.status(status).send({ message, data })
})

router.delete('/comment/:id', auth, async (req, res) => {
  const { status, message, data } = await commentService.deleteComment(req.params.id, req.user)
  return res.status(status).send({ message, data })
})

module.exports = router