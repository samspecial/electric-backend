const { package, benefit } = require("../models");

exports.createBenefit = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(403).json({ error: "Invalid field not allowed" });
    const isBenefitExist = await benefit.findOne({ where: { name } });
    if (isBenefitExist) return res.status(401).json({ error: "Benefits already exist" });
    const benefits = await benefit.create({ name });
    await benefits.save();
    return res.status(200).json({ status: "success", message: "New benefits created" });
  } catch (error) {}
};
