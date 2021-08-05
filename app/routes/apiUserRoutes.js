//Importing middleware
const express = require("express");
const router = express.Router();

const accountSid = 'ACa9041a924682d1d3043adada8420ec8f';
const authToken = 'a0b157791fbe4ad0b8412b2f56e0113b';
const client = require('twilio')(accountSid, authToken);

router.post('/send-otp', function (req, res) {
	var otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
	
    client.messages
      .create({body: 'Your OTP is: '+otp, from: '+19389999952', to: req.body.mobile_number })
      .then(message => res.json({ success: true, message: 'OTP send successfully!', otp: otp }) )
	  .catch(e => { res.json({ success: false, message: e.message }) });
})

module.exports = router;