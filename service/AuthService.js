import Response from '../tools/ServiceResponse.js'

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

export default AuthService