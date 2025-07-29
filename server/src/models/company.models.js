const mongoose = require("mongoose");
const { Schema } = mongoose;
const CompanySchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
      trim: true,
    },
    company_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    company_phone: {
      type: String,
      required: true,
      trim: true,
    },
    company_address: {
      type: String,
    },
    company_registerno: {
      type: String,
    },
    ownerName: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      default: "",
    },
    companyType: {
      type: String,
      enum: [
        "Private Limited",
        "Partnership",
        "Sole Proprietorship",
        "LLP",
        "Other",
      ],
     // required: true,
    },
    establishedAt: {
      type: Date,
      required: true,
    },
    superAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", CompanySchema);
module.exports = { Company };

