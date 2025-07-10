const { User } = require('../models/User.models')

const createAdmin = async (data) => {
    try {
        console.log(data)
        const user = await User.findOne({ email: data.email });
        if (!user) {
            console.log('somthing went wrong !')
            return await User.create(data)
        }
    } catch (error) {
        throw new error
    }
}

const login = async (email) => {
    try {
        return await User.findOne({ email: email })
    } catch (error) {
        throw new error;
    }
}

module.exports = { createAdmin, login }