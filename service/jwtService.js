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
      const token = await db.Token.findOne({where: { UserId, jwt } })
      return !!token;
    } catch (e) {
      console.log(e)
      return false
    }
  },
}

module.exports = jwtService