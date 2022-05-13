const cloudinary = require("cloudinary").v2;

require("dotenv").config(); // allows us to use the evnironmental variables in .env
const { CLOUDINARY_API_KEY, CLOUD_NAME, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
