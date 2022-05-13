const router = require("express").Router();
const upload = require("../middlewares/multer");

router.post("/ticket", upload.array("mediaAssets"), (req, res) => {
  console.log(req.files);
  res.status(200).json({ message: "Success" });
});
module.exports = router;
