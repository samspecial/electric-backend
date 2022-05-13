const multer = require("multer");

// multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  }
});
