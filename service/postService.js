const db = require('../models/index')
const response = require('../util/serviceResponse')
const {use} = require("bcrypt/promises");

const postService = {
  async getPosts(page = 0, perPage = 20) {
    try {
      const posts = await db['Post'].findAll({ include: db['User'].name })
      if (posts) return response.success('Posts fetched successfully', posts)
      else return response.badRequest('Invalid post id')
    } catch (e) {
      console.log(e)
      return response.serverError()
    }
  },

  async getPost(id) {
    try {
      const post = await db['Post'].findByPk(id, { include: 'User' })
      if (post) return response.success('Post fetched successfully', post)
      else return response.badRequest('Invalid post id')
    } catch (e) {
      console.log(e)
      return response.serverError()
    }
  },

  async addPost(data, user) {
    if (!data.post) return response.badRequest('Post is required')

    try {
      const post = await db['Post'].create({ post: data.post, userId: user.id })
      return response.success('Post created successfully', post)
    } catch (e) {
      console.log(e)
      return response.serverError()
    }
  },

  async deletePost(id, user) {
    console.log(user)
    try {
      const post = await db['Post'].findByPk(id)
      if (post) {
        if (post.userId === user.id) {
          post.deleted = true
          await post.save()

          return response.success('Post deleted successfully')
        } else return response.forbidden('You do not own this post')
      } else return response.badRequest('Invalid post id')
    } catch (e) {
      console.log(e)
      return response.serverError()
    }
  },

  async likePost(id, user) {},
}

module.exports = postService