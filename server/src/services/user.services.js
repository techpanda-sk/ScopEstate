const { ERROR } = require("../constants/messages");
const CustomError = require("../exception/customError");
const { User } = require("../models/User.models");

// create Admin
const createAdmin = async (data) => {
  try {
    const email = data.email.toLowerCase().trim();
    const userData = await User.findOne({ email } );
    if (userData) {
      throw new CustomError(ERROR?.USER_ALREADY_EXISTS, 409); 
    }
    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    // console.log("Error in createAdmin:", error?.message);
    throw error;
  }
};

// login admin
const login = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw new error();
  }
};

module.exports = { createAdmin, login };
