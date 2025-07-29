const express = require("express");
const companyController = require("../controllers/company.controller");
const authVerify = require("../middleware/authMiddleware");
const isSuperAdmin = require("../middleware/isSuperAdmin");
const { upload } = require("../middleware/multer.Middleware");
const router = express.Router();

router
  .route("/companies")
  .post(authVerify,isSuperAdmin,upload.single("company_logo"),companyController.createCompany);

module.exports = { router };
