const build = (status, message, data = null) => {
    return {
        status,
        message,
        data
    }
}

const serviceResponse = {
    build,

    success: (message, data = null) => {
        return build(200, message, data)
    },

    badRequest(message) {
        return build(400, message)
    },

    unauthorized(message = 'Unauthorized') {
        return build(401, message)
    },

    forbidden(message = 'You do not have permission') {
        return build(403, message)
    },

    serverError(e = null) {
        console.log(e)
        return build(500, 'An internal server error occurred')
    },
}

module.exports = serviceResponse