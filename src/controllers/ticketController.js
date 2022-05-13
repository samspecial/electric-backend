const { plan, ticket, subscription, user } = require("../models");
const cloudinary = require("../helpers/cloudinary");

exports.createTicket = async (req, res) => {
    try {
        cloudinary.uploader.upload
        // const result = await cloudinary.uploader.upload(req.file.path);
    } catch (error) {
        
    }
}