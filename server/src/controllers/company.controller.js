const CompanyServices = require("../services/company.services");
const fs = require("fs");
const path = require("path");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const createCompany = async (req, res) => {
  try {
    const {
      company_name,
      company_email,
      company_phone,
      company_address,
      company_registerno,
      ownerName,
      companyType,
      establishedAt,
    } = req.body;
    // console.log(req?.file);
    const localFilePath = req.file ? `upload/${req.file.filename}` : null;
    // console.log("path..", localFilePath);
    const coData = {
      company_name,
      company_email,
      company_phone,
      company_address,
      company_registerno,
      company_logo: localFilePath,
      ownerName,
      companyType,
      establishedAt,
    };
    // console.log(coData);
    const coDetails = await CompanyServices.addCompany(coData);
    // if (localFilePath) {
    //   const filePath = path.join(__dirname, "../", localFilePath);
    //   console.log("file path is delete", filePath);
    //   if (fs.existsSync(filePath)) {
    //     fs.unlinkSync(filePath);
    //   } else {
    //     console.warn("File not found at:", filePath);
    //   }
    // }
    return successResponse(res, "company register successful", coDetails, 200);
  } catch (error) {
    return errorResponse(res, error.message || "somthing went wrong", 400);
    // throw error;
  }
};

module.exports = { createCompany };
