const response = require('../util/serviceResponse')
const jwt = require("../util/jwt");
const userRepo = require("../repo/user");

module.exports = async (req, res, next) => {
  const bearer = req.get('Authorization').split(' ');
  if (bearer.length >= 2 && bearer[0].toLowerCase() === 'bearer') {
    const token = bearer[1]

    try {
      const jwtRes = jwt.verify(token)
      if (jwtRes) {
        const user = await userRepo.findOneByEmail(jwtRes.data.email)
        if (user) {
          req.user = user
          return next()
        }
      }

      return res.status(401).send({ message: 'Invalid Token' })
    } catch (e) {
      console.log(e)
      return res.status(500).send({ message: 'An internal server error occurred' })
    }
  } else return response.unauthorized()
}