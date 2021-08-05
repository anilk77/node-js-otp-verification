var nodemailer = require('nodemailer');
const config = require('./../utility/config');
var EmailTemplates = require('swig-email-templates');
var path = require('path');
var moment = require("moment");

var stmpConfig = (config.SMTPType === 'sendgrid') ? config.sendgridMailConfig : config.gmailMailConfig;

var email = stmpConfig.SMTPUsername;
var password = stmpConfig.SMTPPassword;
var host = stmpConfig.SMTPHost;
var port = stmpConfig.SMTPPort;
var smtpType = "";
var smtpSecure = stmpConfig.SMTPSecure;
var smtpFrom = config.siteName + ' ' + stmpConfig.SMTPFrom;
var transporter;
if (smtpType == "gmail") {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });
} else {
  transporter = nodemailer.createTransport({
    service: "SMTP",
    host: host,
    port: port,
    secure: smtpSecure, // use TLS
    auth: {
      user: email,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}
var MailHandler = function Constructor() {

};

MailHandler.prototype.emailToCustomers = function (emailTO, emailsubject, body) {
  var templateDir = path.join(__basedir, 'templates');
  var templates = new EmailTemplates({
    root: templateDir,
    // rewrite: function($) {
    //   $("img.logo").each(function(idx, anchor) {
    //     $(anchor).attr('src', config.BaseURL + "app-assets/images/logo/araw.png");
    //   });
    // }
  });
  var currentYear = moment().year();

  var locals = {
    baseURL: config.BaseURL,
    Body: body,
    imgUrl: config.mailImageUrl,
    frontUrl: config.frontUrl,
    siteName: config.siteName,
    supportMail: config.supportMail,
    address: config.address,
    privacyPolicyUrl: config.privacyPolicyUrl,
    twitterLink: config.twitterLink,
    facebookLink: config.facebookLink,
    linkedinLink: config.linkedinLink,
    instagramLink: config.instagramLink,
    contactUsUrl: config.contactUsUrl,
    currentYear: currentYear,
    domainUrl:config.domainUrl
  };
  templates.render('email.html', locals, function (err, html, text) {
    if (err) {
      // console.log("error", err);
    } else {
      const mailOptions = {
        from: smtpFrom, // sender address
        to: emailTO, // list of receivers
        subject: emailsubject, // Subject line
        html: html,
        text: text
      };
      //console.log(mailOptions);
      transporter.sendMail(mailOptions, function () {
        // if (err)
        //   console.log(err)
        // else
        //   console.log(info);
      });
    }
  })

}

module.exports = MailHandler;
