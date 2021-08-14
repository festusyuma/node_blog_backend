const db = require('../models/index')
const response = require('../util/serviceResponse')
const postRepo = require('../repo/post')

const postService = {
  async getPosts(page = 0, perPage = 20, user) {
    try {
      let posts = await postRepo.fetchAllWithLikes(page, perPage)

      if (posts) {
        posts = posts.map(post => {
          post = post.toJSON()
          post.liked = !! post.PostLikes.find(pl => pl.UserId === user.id)
          delete post.PostLikes
          return post
        })

        return response.success('Posts fetched successfully', await posts)
      } else return response.badRequest('Invalid post id')
    } catch (e) {
      return response.serverError(e)
    }
  },

  async getPost(id, user) {
    try {
      let post = await postRepo.findByIdWithLikes(id)

      if (post) {
        post = post.toJSON()
        post.liked = !! post.PostLikes.find(pl => pl.User.id === user.id)

        return response.success('Post fetched successfully', post)
      } else return response.badRequest('Invalid post id')
    } catch (e) {
      return response.serverError(e)
    }
  },

  async addPost(data, user) {
    if (!data.post) return response.badRequest('Post is required')

    try {
      const post = await db['Post'].create({ post: data.post, UserId: user.id })
      return response.success('Post created successfully', post)
    } catch (e) {
      return response.serverError(e)
    }
  },

  async deletePost(id, user) {
    try {
      const post = await postRepo.findById(id)
      if (post) {
        if (post.UserId === user.id) {
          post.deleted = true
          await post.save()

          return response.success('Post deleted successfully')
        } else return response.forbidden('You do not own this post')
      } else return response.badRequest('Invalid post id')
    } catch (e) {
      return response.serverError(e)
    }
  },

  async likePost(id, user) {
    try {
      const post = await postRepo.findById(id)
      if (post) {
        let postLike = await postRepo.getUserPostLike(post, user)

        if (!postLike) {
          await postRepo.addLike(post, user)
          return response.success('Post liked successfully')
        } {
          await postRepo.removeLike(post, postLike)
          return response.success('Post like removed successfully')
        }

      } else return response.badRequest('Invalid post id')
    } catch (e) {
      return response.serverError(e)
    }
  },
}

module.exports = postService