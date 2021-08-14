const response = require('../util/serviceResponse')

const postService = {
  async getPost(id) {
    return response.success('passed', { id })
  },
}

module.exports = postService