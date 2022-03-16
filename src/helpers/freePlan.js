const subscription = require("../models/subscription");
const createTrial = async (id, status = "ACTIVE") => {
  const duration = 15;
  const planId = "fbb57f36-5437-4fe0-91de-2b96012c642f";
  const expiryDate = new Date(new Date().getTime() + duration * 24 * 60 * 60 * 1000);
  const freeSubscription = await subscription.create({
    status,
    expired_date: expiryDate,
    userId: id,
    planId
  });
  freeSubscription.save();
};
module.exports = createTrial;
