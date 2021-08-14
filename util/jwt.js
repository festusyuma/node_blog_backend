const jwt = require('jsonwebtoken')

function generate(data) {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '30s' });
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return null
  }
}

module.exports = { generate, verify }