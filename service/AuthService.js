const db = require('../models/index')
const response = require('../tools/ServiceResponse')
const userRepo = require('../repo/user')
const bcrypt = require("bcrypt");

const AuthService = {
    async register(data) {
        if (!data.email) return response.badRequest('email is required')
        if (!data.password) return response.badRequest('password is required')

        const emailBreakDown = data.email.split('@')
        if (emailBreakDown.length <= 1) return response.badRequest('invalid email address')
        data.name = emailBreakDown[0]

        try {
            const existingUser = await userRepo.findOneByEmail(data.email)
            if (existingUser) return response.badRequest('User with email already exist')

            const user = await db['User'].create(data)
            return response.success('Registration successful', user)
        } catch (e) {
            console.log(e)
            return response.serverError()
        }
    },

    async login(data) {
        try {
            const user = await userRepo.findOneByEmail(data.email)
            if (user) {
                const match = await bcrypt.compare(data.password, user.password);
                if (match) {
                    return response.success('Login successful', { name: 'festus' })
                }
            }

            return response.unauthorized('email or password is incorrect')
        } catch (e) {
            console.log(e)
            return response.serverError()
        }
    },
}

module.exports = AuthService