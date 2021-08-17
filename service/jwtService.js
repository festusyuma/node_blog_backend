const db = require('../models/index')
const response = require('../util/serviceResponse')
const postRepo = require('../repo/post')

const jwtService = {
  async saveJwt(jwt, UserId) {
    try {
      await db.Token.create({ UserId, jwt  })
    } catch (e) {
      console.log(e)
    }
  },

  async retrieveJwt(jwt, UserId) {
    try {
      return await db.Token.findOne({where: {UserId, jwt}});
    } catch (e) {
      console.log(e)
      return null
    }
  },
}

module.exports = jwtService