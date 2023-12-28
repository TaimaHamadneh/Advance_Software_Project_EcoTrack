const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const axios = require('axios');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
   }
});

function sendThresholdEmail(toEmail, location) {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: toEmail,
    subject: "Temperature Threshold Exceeded",
    html: `<div>
              <h4>Alert: The temperature in ${location} is above your configured threshold. Stay safe and take care!</h4>
          </div>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = {
  sendThresholdEmail
};
