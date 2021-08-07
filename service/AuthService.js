const Response = require('../tools/ServiceResponse')

class AuthService {

    login(user) {
        const username = user.username
        const password = user.password

        return new Response(
            200,
            'Login successful',
            'ekyyykkdskksdkdsksjkds'
        )
    }
}

module.exports = AuthService