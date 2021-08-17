const db = require('../models/index')
const response = require('../util/serviceResponse')
const postRepo = require('../repo/post')

const commentService = {

  async addComment(id, data, user) {
    if (!data.comment || data.comment === '') return response.badRequest('Comment is required')
    if (!id) return response.badRequest('Invalid post id')

    try {
      const post = await postRepo.findById(id)
      if (post) {
        await postRepo.addComment(data.comment, post, user)
        return response.success('Comment added successfully')
      } else return response.badRequest('Invalid post id')
    } catch (e) {
      return response.serverError(e)
    }
  },

  async deleteComment(id, user) {
    try {
      const comment = await db.Comment.findByPk(id)
      if (comment) {
        if (comment.UserId === user.id) {
          await postRepo.removeComment(comment)
          return response.success('Comment deleted successfully')
        } else return response.forbidden('You do not own this comment')
      } else return response.badRequest('Invalid comment id')
    } catch (e) {
      return response.serverError(e)
    }
  },
}

module.exports = commentService