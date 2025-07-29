const Jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const payload = {
    id: data._id,
    email: data.email,
    role: data.role,
  };
  const token = Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

module.exports = generateToken;
