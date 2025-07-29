const mongoose = require("mongoose");

const { Schema } = mongoose;

const stickySchema = new Schema(
  {
    title : {
        type:String,
        required:true,
        unique:true
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    colorcode: {
      type: String,
      // required: true,
    },
    notes: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

const stickyNotes = mongoose.model("stickynote", stickySchema);
module.exports = { stickyNotes };
