const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadPath = path.join(__dirname, "../upload");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};
console.log(uploadPath);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const extName = file.originalname.split(".").pop();
    const fileName = `${timestamp}.${extName}`;
    return cb(null, fileName);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { upload };
