const sgMail = require("@sendgrid/mail");
require("dotenv").config();

exports.sendEmail = async (option) => {
  const { APIKEY_SENDGRID } = process.env;
  sgMail.setApiKey(APIKEY_SENDGRID);
  const mailOptions = {
    from: option.from,
    to: option.to,
    subject: option.subject,
    text: option.text,
    html: option.html
  };
  sgMail
    .send(mailOptions)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.message);
    });
};

// const msg = {
//   to: "test@example.com", // Change to your recipient
//   from: "test@example.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: `<h3>Hello ${firstname}</h3>
//   <p>We are excited to have you here.</p>
//   <p>Kindly follow the link below to activate your account</p>
//   <p>This expires in 1 hour time. <a href="${url}">here</a> now.</p>`
// };
