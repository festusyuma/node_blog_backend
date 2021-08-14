const db = require('../models/index')

module.exports = {
  async findById(id) {
    return db['Post'].findByPk(id)
  },

  async findByIdWithLikes(id) {
    return await db['Post'].findByPk(id, {
      include: {
        model: db['PostLike'],
        attributes: ['createdAt'],
        include: db['User']
      },
    })
  },

  async fetchAllWithLikes() {
    return await db['Post'].findAll({
      include: {
        model: db['PostLike'],
        attributes: ['UserId'],
      },
    })
  },

  async addLike(post, user) {
    try {
      await db['PostLike'].create({ PostId: post.id, UserId: user.id })
      post.totalLikes += 1
      await post.save()
    } catch (e) {
      console.log(`sequelize error occurred: ${e.message}`)
    }
  },

  async removeLike(post, postLike) {
    try {
      await postLike.destroy()
      post.totalLikes -= 1
      await post.save()
    } catch (e) {
      console.log(`sequelize error occurred: ${e.message}`)
    }
  },

  async getUserPostLike(post, user) {
    return await db['PostLike'].findOne({ where: { PostId: post.id, UserId: user.id } })
  },
}