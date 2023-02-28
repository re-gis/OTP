const bcrypt = require("bcryptjs");
const _ = require("lodash");
const axios = require("axios");
const { User } = require("../Models/user.model");
const { Otp } = require("../Models/otp.model");
const otpGenerator = require("otp-generator");
const twilio = require('twilio')(process.env.SID, process.env.AUTH_TOKEN)

// Function for getting number from the signup and sending the OTP
const signUp = async (req, res) => {
  let user = await User.findOne({
    number: req.body.number,
  });

  if (user) {
    res.json({ message: "User already exists..." });
  } else {
    // Create OTP
    const OTP = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false
    });

    const number = req.body.number;
    console.log(OTP);
    console.log(number);
    // Hash the otp
    const hashedOtp = await bcrypt.hash(OTP, 10);

    const otp = await Otp.create({
      number: number,
      otp: hashedOtp,
    });

    if (otp) {
      // Send the OTP to Phone number using Twilio
      twilio.messages.create({
        from: "+12765985304",
        to: number,
        body: `Your OTP code is ${OTP}`
      })
      .then(() => {
        console.log('OTP sent...')
        res.json({ message: 'OTP sent...' })
    })
    .catch((err) => {
      console.log(err)
      res.json({ message: 'Error occurred...'})
  })

    } else {
      return res.json({ message: "Error occurred..." });
    }
  }
};

// Verifying the OTP
const verifyOtp = async (req, res) => {
    const number = req.body.number
   let otpFind = await Otp.findOne({number})
   if(!otpFind) {
    res.json({ message: 'OTP expired...'})
   } else {
    // Compare the otp
    const validOtp = await bcrypt.compare(req.body.otp, otpFind.otp)

    if(!validOtp) {
        res.json({ message: 'Invalid OTP...'})
    } else {
        // If the OTP is valid, delete if from the database
        const deleteOtp = await Otp.findOneAndRemove(number)
        if(deleteOtp) {
            res.json({ message: 'OTP successfully verified...'})
        } else {
            res.json({ message: 'An error occurred...'})
        }

    }
   }

};

module.exports = {
  signUp,
  verifyOtp,
};
