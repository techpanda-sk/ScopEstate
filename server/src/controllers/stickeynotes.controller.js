const { SUCCESS, ERROR } = require("../constants/messages");
const CustomError = require("../exception/customError");
const stickey = require("../services/stickeynotes.services");
const { successResponse, errorResponse } = require("../utils/responseHandler");

//! create Notes
const createNotes = async (req, res) => {
  try {
    const { title, name, colorcode, notes } = req.body;
    const userId = req.admin.id;

    const data = await stickey.create({
      title,
      name,
      colorcode,
      notes,
      createdBy: userId,
    });
    return successResponse(res, SUCCESS?.STICKEY_CREATE, data, 201);
  } catch (error) {
    console.log("Create Sticky Error:", error.message);
    return errorResponse(res, "Internal server error", 400);
  }
};

//! get All Notes
const getAllStickey = async (req, res) => {
  try {
    const userId = req.admin.id;
    const data = await stickey.getStickey(userId);
    return successResponse(
      res,
      "Fetch All Stickey Redcords SuccessFully",
      data,
      201
    );
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 400);
  }
};

//! update
const updateStickey = async (req, res) => {
  try {
    const { id } = req.params;
    // const userId = req.admin.id;
    const { name, notes, title } = req.body;

    if (!name && !notes && !title) {
      return res.status(400).json({ message: "Every field is empty" });
    }
    const userData = { name, notes, title };

    const data = await stickey.updateStickey(id, userData);
    if (!data) console.log("every field is empty");
    console.log("data", data);
    return successResponse(res, SUCCESS.USER_UPDATED, data, 201);
  } catch (error) {
    console.log("error message", error.message);
    return errorResponse(res, ERROR.SERVER, 400);
  }
};

//! Delete
const deleteStickey = async(req, res) => {
  try {
    // const { userId } = req.admin.id;
   const {id}= req.params;
    // const { id } = req.body;
   const data =  await stickey.deleteNotes(id);
   if(!data) throw new CustomError("data note not found",400)
    return successResponse(res,"Notes deleted successfully.",null,201)
  } catch (error) {
    return errorResponse(res,"data not deleted.",400)
}
};

module.exports = {
  createNotes,
  getAllStickey,
  updateStickey,
  deleteStickey,
};
