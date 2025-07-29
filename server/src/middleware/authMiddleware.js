require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ERROR } = require("../constants/messages");
const CustomError = require("../exception/customError");
const { errorResponse } = require("../utils/responseHandler");

const authVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log("auth",authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError(ERROR?.AUTH_FAILED, 500);
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env?.JWT_SECRET);
    req.admin = decoded;
    // console.log(req.admin)
    next();
  } catch (error) {
    console.log("error", error.message);
    return errorResponse(res, error.message || ERROR?.AUTH_FAILED, 401);
  }
};

module.exports = authVerify;
