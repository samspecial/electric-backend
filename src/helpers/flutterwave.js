const Flutterwave = require("flutterwave-node-v3");
const axios = require("axios");
const { FLUTTERWAVE_TEST_ENCKTYPE, FLUTTERWAVE_TEST_PUBLIC_KEY, FLUTTERWAVE_TEST_SECRET_KEY } = process.env;
const { FLUTTERWAVE_LIVE_ENCKTYPE, FLUTTERWAVE_LIVE_PUBLIC_KEY, FLUTTERWAVE_LIVE_SECRET_KEY } = process.env;

let secretKey = process.env.NODE_ENV === "production" ? FLUTTERWAVE_LIVE_SECRET_KEY : FLUTTERWAVE_TEST_SECRET_KEY;
let publicKey = process.env.NODE_ENV === "production" ? FLUTTERWAVE_LIVE_PUBLIC_KEY : FLUTTERWAVE_TEST_PUBLIC_KEY;
//innitializing the Flutterwave class
const flw = new Flutterwave(publicKey, secretKey);
console.log("Node Environment: ", process.env.NODE_ENV);
class Payment {
  //Card ccharges
  async chargeCard(option) {
    try {
      // payload
      const payload = {
        card_number: option.card_number,
        cvv: option.cvv,
        expiry_month: option.expiry_month,
        expiry_year: option.expiry_year,
        currency: option.currency,
        amount: option.amount,
        redirect_url: "https://www.google.com",
        fullname: option.fullname,
        email: option.email,
        phone_number: option.phone_number,
        enckey: process.env.NODE_ENV === "production" ? FLUTTERWAVE_LIVE_ENCKTYPE : FLUTTERWAVE_TEST_ENCKTYPE,
        tx_ref: "MC" + Date.now() //
      };
      //card charge

      const response = await flw.Charge.card(payload);

      return response;
    } catch (error) {
      throw error;
    }
  }

  //OTP AUTH
  async otpAuth(cardRespons, otp) {
    //this
    try {
      if (cardRespons.meta.authorization.mode === "otp") {
        let endpoint2 = cardRespons.meta.authorization.endpoint;
        var url2 = `https://api.flutterwave.com${endpoint2}`;
        console.log(url2);
        let encryptData = {
          otp: otp,
          flw_ref: cardRespons.data.flw_ref,
          type: "card"
        };
        let response2 = await axios.post(url2, encryptData, {
          headers: {
            Authorization: `Bearer ${
              process.env.NODE_ENV !== "production" ? FLUTTERWAVE_TEST_SECRET_KEY : FLUTTERWAVE_LIVE_SECRET_KEY
            }`
          }
        });
        // console.log(response2)
        return response2.data;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Payment;
