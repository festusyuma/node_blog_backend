const db = require('../models/index')
const response = require('../util/serviceResponse')
const userRepo = require('../repo/user')
const bcrypt = require("bcrypt");
const jwt = require("../util/jwt");
const mailService = require('./mailService')
const jwtService = require('./jwtService')

const authService = {
    async register(data) {
        if (!data.email) return response.badRequest('email is required')
        if (!data.password) return response.badRequest('password is required')

        const emailBreakDown = data.email.split('@')
        if (emailBreakDown.length <= 1) return response.badRequest('invalid email address')
        data.name = emailBreakDown[0]

        try {
            const existingUser = await userRepo.findOneByEmail(data.email)
            if (existingUser) return response.badRequest('User with email already exist')

            const userReq = { email: data.email, password: data.password, name: data.name }
            const user = await db['User'].create(userReq)

            try {
                await mailService.send(user.email)
            } catch (e) {
                console.log(e)
            }

            return response.success('Registration successful', user)
        } catch (e) {
            return response.serverError(e)
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
                    try {
                        await jwtService.saveJwt(token, user.id)
                        return response.success('Login successful', { user, token })
                    } catch (e) {
                        return response.serverError(e)
                    }
                }
            }

            return response.unauthorized('email or password is incorrect')
        } catch (e) {
            return response.serverError(e)
        }
    },

    async getUser(user) {
        return response.success('Successful', user)
    },

    async logout(token, user) {
        try {
            const jtwToken = await jwtService.retrieveJwt(token, user.id)

            if (jtwToken) {
                jtwToken.expired = true
                await jtwToken.save()
            }

            return response.success('Logged out successfully')
        } catch (e) {
            return response.serverError(e)
        }
    }
}

module.exports = authService