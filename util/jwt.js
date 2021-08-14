const jwt = require('jsonwebtoken')

function generate(data) {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return null
  }
}

module.exports = { generate, verify }