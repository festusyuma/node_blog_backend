const db = require('../models/index')

module.exports = {
  async findById(id) {
    return db['Post'].findByPk(id)
  },

  async findByIdWithLikes(id) {
    return await db.Post.findByPk(id, {
      attributes: { exclude: 'UserId' },
      include: [
        {
          model: db.User,
          attributes: ['id', 'name'],
        },
        {
          model: db.PostLike,
          attributes: ['createdAt'],
          include: {
            model: db.User,
            attributes: ['id', 'name']
          }
        },
        {
          model: db.Comment,
          attributes: ['comment', 'createdAt'],
          include: {
            model: db.User,
            attributes: ['id', 'name']
          }
        }
      ]
    })
  },

  async fetchAllWithLikes(page, perPage) {
    return await db.Post.findAll({
      attributes: { exclude: 'UserId' },
      include: [
        { model: db.PostLike, attributes: ['UserId'] },
        { model: db.User, attributes: ['name'] },
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      offset: (page - 1) * perPage,
      limit: perPage
    })
  },

  async countAll() {
    return await db.Post.count()
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