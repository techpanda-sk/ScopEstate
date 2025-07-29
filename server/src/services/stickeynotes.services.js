const { stickyNotes: stickey } = require("../models/stickynotes.models");

// const create = async (data) => {
//   try {
//     const title = await stickey.fineOne({ title: data.title });
//     console.log("title", title)

//     return await stickey.create(data);
//   } catch (error) {
//     throw new error();
//   }
// };

//! create
const create = async (data) => {
  try {
    const Stickey = new stickey(data);
    return await Stickey.save();
  } catch (error) {
    throw error;
  }
};

//! get
const getStickey = async (userId) => {
  try {
    return await stickey.find({ id: userId.id });
  } catch (error) {
    throw error;
  }
};

//! Update
const updateStickey = async (id, userData) => {
  try {
    // console.log(id)
    const existingNotes = await stickey.findById(id);
    if (!existingNotes) return null;
    // console.log(existingNotes.title)
    // const { title, notes, name } = existingNotes;
    // console.log(title,notes,name)
    const updateNote = await stickey.findByIdAndUpdate(id, { $set: userData });
    // console.log(updateNote);
    return updateNote;
  } catch (error) {
    throw error;
  }
};

const deleteNotes = async (id) => {
  try {
    return await stickey.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getStickey,
  updateStickey,
  deleteNotes,
};
