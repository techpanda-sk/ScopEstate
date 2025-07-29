const userServices = require("../services/user.services");
const bcrypt = require("bcrypt");
const CustomError = require("../exception/customError");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { SUCCESS, ERROR } = require("../constants/messages");
const generateToken = require("../utils/generateToken");
const saltRounds = 10;

//! create admin
const createSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, role, isActive } = req.body;
    // console.log(name,email,password,role,isActive) // for testing
    if (!email || !name || !password || !role || !isActive) {
      throw new CustomError(Error.ALL_FIELDS_REQUIRED, 401);
    }
    const bcrptPassword = await bcrypt.hash(password, saltRounds);
    const user = { name, email, password: bcrptPassword, role, isActive };
    if (!user) {
      throw new CustomError(ERROR.NOT_FOUND, 401);
    }
    const data = await userServices.createAdmin(user);
    if (!data) {
      throw new CustomError(ERROR?.NOT_FOUND, 401);
    }
    const token = generateToken(user);
    return successResponse(res, SUCCESS.USER_CREATED, data, 200, {
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    // return errorResponse(res,"user is already exsit",401)
    return errorResponse(res, error.message || ERROR?.AUTH_FAILED, 401);
  }
};

//! login admin
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError(ERROR?.NOT_FOUND, 404);
    }
    const data = await userServices.login(email);
    if (!data) {
      throw new CustomError(ERROR?.NOT_FOUND, 404);
    }
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      throw new CustomError(ERROR?.INVALID_CREDENTIALS, 401);
    }
    const token = generateToken(data);
    return successResponse(res, ERROR?.LOGIN_SUCCESS, data, 200, {
    token: token,
    });
  } catch (error) {
    return errorResponse(res, error.message || ERROR?.AUTH_FAILED, 404);
  }
};

module.exports = { createSuperAdmin, loginUser };
