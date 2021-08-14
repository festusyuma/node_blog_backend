const response = require('../util/serviceResponse')
const db = require('../models/index')

const userService = {
    async findOneByEmail(email) {

    },

    async save(data) {

        try {
            const user = await db['User'].create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })

            return response.success('User created', user)
        } catch (e) {
            console.log(e)
            return response.serverError()
        }
    }
}

module.exports = userService