const express = require("express");
const user = require("../controllers/users.controller");
const stickynote = require("../controllers/stickeynotes.controller");
const authVerify = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(authVerify, user?.createSuperAdmin);
router.route("/login").post(user?.loginUser);

router.route("/create").post(authVerify, stickynote?.createNotes);
router.route("/").get(authVerify, stickynote?.getAllStickey);
router
  .route("/:id")
  .put(authVerify, stickynote.updateStickey) //! Update a sticky by ID
  .delete(authVerify, stickynote.deleteStickey); //! Delete a sticky by ID

module.exports = { router };
