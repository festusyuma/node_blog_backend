const serviceResponse = (status, message, data) => {
    return {
        status,
        message,
        data
    }
}

module.exports = serviceResponse