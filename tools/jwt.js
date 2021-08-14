const jwt = require('jsonwebtoken')

function generate(data) {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '30s' });
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    console.log(e)
  }
}

module.exports = { generate, verify }