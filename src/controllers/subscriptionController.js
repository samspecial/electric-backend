const { plan, benefit, subscription, user } = require("../models");

exports.createBenefit = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Invalid field not allowed" });
    const isBenefitExist = await benefit.findOne({ where: { name } });
    if (isBenefitExist) return res.status(400).json({ error: "Benefits already exist" });
    const benefits = await benefit.create({ name });
    await benefits.save();
    return res.status(201).json({ status: "success", message: "New benefits created", benefit: benefits });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error });
  }
};

exports.deleteBenefit = async (req, res) => {
  const { id } = req.params;
  try {
    await benefit.destroy({
      where: { id }
    });
    return res.status(200).json({ status: "success", message: "Benefit deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

exports.updateBenefit = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    await benefit.update({ name }, { where: { id } });
    return res.status(200).json({ status: "success", message: "Benefit updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error });
  }
};

exports.getBenefits = async (req, res) => {
  try {
    const benefits = await benefit.findAll();
    return res.status(200).json({ status: "success", data: benefits });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const { planName, price, description, duration, benefits, calltoAction } = req.body;
    // const benefits = await benefit.findAll({ attributes: ["name"] });

    const newPlan = {
      plan_name: planName,
      price,
      description,
      duration,
      callToAction: calltoAction,
      plan_benefit: benefits
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
    return res.status(200).json({ status: "success", data: plans });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.deletePlan = async (req, res) => {
  const { id } = req.params;
  try {
    await plan.destroy({
      where: { id }
    });
    return res.status(200).json({ status: "success", message: "Plan deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

// exports.chargeCard = async (req, res) => {
//   const {
//     card_number,
//     cvv,
//     expiry_month,
//     expiry_year,
//     currency,
//     phone_number,
//     amount,
//     fullname,
//     email,
//     tx_ref,
//     redirect_url
//   } = req.body;
//   const payload = {
//     card_number,
//     cvv,
//     expiry_month,
//     expiry_year,
//     currency,
//     amount,
//     fullname,
//     phone_number,
//     email,
//     tx_ref,
//     redirect_url,

//     enckey: ENCRYPTION
//   };

//   try {
//     const response = await flw.Charge.card(payload);

//     if (response.meta.authorization.mode === "pin") {
//       let payload2 = payload;
//       payload2.authorization = {
//         mode: "pin",
//         fields: ["pin"],
//         pin: 3310
//       };
//       console.log("Card One: ", payload2);
//       const reCallCharge = await flw.Charge.card(payload2);
//       console.log("Recall Charge: ", reCallCharge.meta.authorization.pin);
//       const callValidate = await flw.Charge.validate({
//         otp: "12345",
//         flw_ref: reCallCharge.data.flw_ref
//       });
//       console.log(callValidate);
//     }
//     if (response.meta.authorization.mode === "redirect") {
//       var url = response.meta.authorization.redirect;
//       open(url);
//     }
//     console.log(response);
//     res.status(200).json({ response });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.createSubscription = async (req, res) => {
  try {
    const { id } = req.session.user;
    const { status, planId } = req.body;
    const currentPlan = await plan.findOne({ where: { uuid: planId } });
    const { duration, plan_name } = currentPlan;

    const isFreePlanActive = await subscription.findAll({
      include: [
        { model: plan, as: "plans" },
        { model: user, as: "users" }
      ],
      where: {
        ["$subscription.userId$"]: id,
        planId,
        ["$plans.plan_name$"]: "Free"
      }
    });

    if (isFreePlanActive.length > 0)
      return res
        .status(400)
        .json({ status: "failed", message: "Your free tier period is over, kindly choose another plan" });
    const expiryDate = new Date(new Date().getTime() + duration * 24 * 60 * 60 * 1000);

    const newSubscription = await subscription.create({
      status,
      expired_date: expiryDate,
      userId: id,
      planId
    });
    newSubscription.save();
    return res.status(201).json({
      status: "success",
      message: `Your ${plan_name} subscription successfully activated and expires on ${expiryDate}`
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscription.findAll();
    return res.status(200).json({ status: "success", data: subscriptions });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};
exports.getSubscriptions = async (req, res) => {
  try {
    const { id } = req.session.user;
    const subscriptions = await subscription.findAll({ where: { userId: id, status: "ACTIVE" } });

    return res.status(200).json({ status: "success", data: subscriptions });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};
