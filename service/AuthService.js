const db = require('../models/index')
const response = require('../tools/serviceResponse')
const userRepo = require('../repo/user')
const bcrypt = require("bcrypt");
const jwt = require("../tools/jwt");

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
            let user = await userRepo.findOneByEmailWithPassword(data.email)
            if (user) {
                const match = await bcrypt.compare(data.password, user.password);
                if (match) {
                    user = user.toJSON()
                    delete user.password

                    const token = jwt.generate(user)
                    return response.success('Login successful', { user, token })
                }
            }

            return response.unauthorized('email or password is incorrect')
        } catch (e) {
            console.log(e)
            return response.serverError()
        }
    },

    async getUser(data) {
        const token = data.token // todo use header

        try {
            const res = jwt.verify(token)
            if (res) {
                const user = await userRepo.findOneByEmail(res.data.email)
                if (user) return response.success('successful', user)
            }

            return response.unauthorized('Invalid token')
        } catch (e) {
            console.log(e)
            return response.serverError()
        }
    },
}

module.exports = AuthService