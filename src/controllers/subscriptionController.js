const { plan, benefit } = require("../models");

exports.createBenefit = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Invalid field not allowed" });
    const isBenefitExist = await benefit.findOne({ where: { name } });
    if (isBenefitExist) return res.status(400).json({ error: "Benefits already exist" });
    const benefits = await benefit.create({ name });
    await benefits.save();
    return res.status(201).json({ status: "success", message: "New benefits created" });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const { name, price, description, duration } = req.body;
    const benefits = await benefit.findAll({ attributes: ["name"] });
    console.log("benefits", benefits);
    const newPlan = {
      plan_name: name,
      price,
      description,
      duration,
      package_benefit: benefits
    };
    const plans = await plan.create(newPlan);
    plans.save();
    return res.status(201).json({ status: "success", message: "New plans created" });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await plan.findAll();
    return res.status(200).json({ status: "success", message: plans });
  } catch (error) {}
};
