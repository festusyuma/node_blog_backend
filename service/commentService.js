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
        const comment = await db.Comment.create({ comment: data.comment, UserId: user.id, PostId: post.id })
        post.totalComments += 1
        await post.save()

        return response.success('Comment added successfully', comment)
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
          comment.deleted = true
          await comment.save()

          const post = await comment.getPost()
          if (post) {
            post.totalComments -= 1
            if (post.totalComments < 0) post.totalComments = 0
            await post.save()
          }

          return response.success('Comment deleted successfully')
        } else return response.forbidden('You do not own this comment')
      } else return response.badRequest('Invalid comment id')
    } catch (e) {
      return response.serverError(e)
    }
  },
}

module.exports = commentService