const response = require('../tools/ServiceResponse')

const AuthService = {
    login(user) {
        const username = user.username
        const password = user.password
        return response(200, 'Login successful', 'ekyyykkdskksdkdsksjkds')
    },
}

module.exports = AuthService