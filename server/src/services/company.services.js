const CustomError = require("../exception/customError");
const { Company } = require("../models/company.models");
const addCompany = async (data) => {
  try {
    const coEmail = await Company.findOne({
      company_email: data.company_email,
    });
    if (coEmail) throw new CustomError("company is allready Register", 404);
    return await Company.create(data);
  } catch (error) {
    throw error;
  }
};
module.exports = { addCompany };
