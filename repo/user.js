const db = require('../models/index')

module.exports = {
  async findOneByEmail(email) {
    return await db['User'].findOne({ where: { email } })
  }
}