const mongoose = require("mongoose");
const { ROLES } = require("../constants/roles");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CLIENT,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
