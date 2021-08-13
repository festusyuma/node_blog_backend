const response = require('../tools/ServiceResponse')
const db = require('../models/index')

const userService = {
    async save(data) {

        try {
            const user = await db['User'].create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })

            return response(200, 'User created', user)
        } catch (e) {
            console.log(e)
            return response(400, 'internal server error')
        }
    }
}

module.exports = userService