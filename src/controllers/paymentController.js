const Payment = require("../helpers/flutterwave");

//payment response
let paymentResponse;

exports.chargeCard = async (req, res) => {
  try {
    //get req
    const { pin, sixteenDigit, cvv, expiryDate, expiryYear, email_address, full_name, phoneNumber } = req.body;

    //get the current user

    //aggument be sent as a payload
    let options = {
      pin,
      card_number: sixteenDigit,
      cvv,
      expiry_month: expiryDate,
      currency: "NGN",
      amount: "10",
      expiry_year: expiryYear,
      fullname: full_name,
      email: email_address,
      phone_number: phoneNumber
    };
    console.log(options);
    //initiating the Payment class
    let fluterPayment = new Payment();

    //charging the user with card
    let response1 = await fluterPayment.chargeCard(options);
    //confirm the response
    // console.log(response1)

    console.log("Tell: ", response1);
    if (response1) {
      if (response1.meta.authorization.mode === "redirect") {
        var url = response1.meta.authorization.redirect;
        res.status(200).json({
          status: "success",
          redirect: url
        });
      }

      paymentResponse = response1;
      console.log("OTP Response: ", response1);
      return res.status(200).json({
        status: "success",
        response: response1.message
      });
    } else {
      return res.status(400).json({
        status: "failed",
        response: "Plese set up your profile to make payment.."
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      response: error.message || "Something went wrong"
    });
  }
};

//OTP Auth

exports.otpAuth = async (req, res) => {
  try {
    //get req.param
    const { otp } = req.body;

    //initiating the Payment class
    let fluterPayment = new Payment();

    //input otp for final auth
    let finalRespones = await fluterPayment.otpAuth(paymentResponse, otp);

    //send finalrespones to the client
    return res.status(200).json({
      status: "success",
      response: `${finalRespones.data.narration} is ${finalRespones.data.processor_response}`
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      response: "CARD payment issue 2, pls contact your customer care"
    });
  }
};
