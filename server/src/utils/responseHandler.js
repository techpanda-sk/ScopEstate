const successResponse = (res, message = "Success", data = {}, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    })
}
const errorResponse = (res, error = "Error", messages = [], status = 500) => {
    return res.status(status).json({
        success: false,
        error,
        messages: Array.isArray(messages) ? messages : [messages]
    });
}

module.exports = {
    successResponse,
    errorResponse
};