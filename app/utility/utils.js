var _ = require('lodash');
var jwt = require("jsonwebtoken");
var reCAPTCHA = require("recaptcha2");
var authenticator = require('authenticator');
const rp = require('request-promise');
const axios = require('axios');
var moment = require('moment');

var config = require("./config");
var nationalities = require('./countries.json')

var recaptcha = new reCAPTCHA({
    siteKey: config.captchaSiteKey,
    secretKey: config.captchaSiteSecret
});

const secretKeys = require("../utility/secretKeys");
var User = require("./../models/User");
var UserRating = require("./../models/UserRating");
var Notification = require("./../models/Notification");
var WalletAddresses = require("./../models/WalletAddresses");
var UnSolvedTransaction = require("./../models/UnSolvedTransaction");
var PricingPlan = require("./../models/PricingPlan");
var PlanEntity = require("./../models/PlanEntity");
var Offering = require("./../models/Offering");

var {
    UserRoleEnum
} = require('./../enums/UserRoleEnum');
var OfferingEnum = require("../enums/OfferingEnum");
var WalletEnum = require("../enums/WalletEnum");

function sendResponse(res, statusCode, message, data) {
    var obj;
    if (data) {
        obj = {
            code: statusCode,
            message: message,
            data: data
        }
    } else {
        obj = {
            code: statusCode,
            message: message
        }
    }
    return res.status(statusCode).json(obj);
}//end of sendReponse
function emailProcess(email, toLowerFlag = false) {
    var domainArray = ['googlemail.com', 'gmail.com'];
    email = _.trim(email);
    email = (toLowerFlag) ? _.toLower(email) : email;
    var email_ar = email.split("@");
    if (domainArray.indexOf(email_ar[1]) > -1) {
        var pretext = email_ar[0].replace(/\./g, '');
        email = pretext + '@' + email_ar[1];
    }
    return email;
}
function processUserInput(value) {
    if (value && value != '') {
        value = _.trim(value);
        return value;
    }
    return undefined;
}
function isValidEmail(email) {
    /* eslint-disable no-useless-escape */
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    /* eslint-enable no-useless-escape */
    return emailRegex.test(email)
}
function sendForgotPasswordCode(data, adminFlag) {
    let email = data.email;
    let firstname = data.firstname;
    let subject = "Reset password request at " + config.siteName;
    let token = jwt.sign({
        verificationEmail: email
    },
        secretKeys.jwtSecret, {
        expiresIn: 30 * 60
    }
    );
    let resetLink = (!_.isUndefined(adminFlag)) ? config.AdminBaseURL + 'user/reset-password/' + token : config.BaseURL + 'user/reset-password/' + token;
    let body = '<p> Hi ' + firstname + ',</p> ' +
        '<p>You recently requested to reset your password for your ' + config.siteName + ' account. Click the button below to reset it.</p>' +
        '<div style="text-align: center"><a href="' + resetLink + '" style="display: inline-block;padding: 11px 30px 6px;margin: 20px 0px 30px;font-size: 15px;color: #fff;background: #01a8fe;border-radius: 5px;">Reset Your Password</a></div>' +
        '<p>If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 30 minutes.</p>';
    emailHandler.emailToCustomers(email, subject, body);
}



function sendEmailVerificationCode(data) {
    let email = data.email;
    let firstname = data.firstname;
    let subject = 'Account activation required at ' + config.siteName;
    let token = jwt.sign({
        verificationEmail: email
    },
        secretKeys.jwtSecret, {
        expiresIn: 24 * 60 * 60 * 2
    }
    );
    let urlLink = `${config.BaseURL}user/email-verify/${token}`;
    let body = '<p> Hi ' + firstname + ',</p> ' +
        '<p>Thank you for creating account on the ' + config.siteName + ' platform. There is one more step before you can use it, you need to activate your account by clicking the button below. Once you click the button, just login to your account to access the Dashboard.</p>' +
        '<div style="text-align: center"><a href="' + urlLink + '" style="display: inline-block;padding: 11px 30px 6px;margin: 20px 0px 30px;font-size: 15px;color: #fff;background: #01a8fe;border-radius: 5px;">Activate My Account</a></div>';
    emailHandler.emailToCustomers(email, subject, body);
}

function sendSubscribeVerificationCode(email) {
    if (email) {
        let subject = 'Email Verification Required at ' + config.siteName;
        let token = jwt.sign({
            verificationEmail: email
        },
            secretKeys.jwtSecret, {
            expiresIn: 24 * 60 * 60 * 2
        }
        );
        let urlLink = `${config.BaseURL}user/user/subscriber/verify/${token}`;
        let body = '<p> Hi, </p> ' +
            '<p>Thank you for subscribing with the ' + config.siteName + ' platform. There is one more step before you receive email updates, you need to activate your account by clicking the link below. </p>' +
            '<div style="text-align: center"><a href="' + urlLink + '" style="display: inline-block;padding: 11px 30px 6px;margin: 20px 0px 30px;font-size: 15px;color: #fff;background: #01a8fe;border-radius: 5px;">Activate My Subscription</a></div>';
        emailHandler.emailToCustomers(email, subject, body);
    }
}






function sendPasswordChangedEmail(data) {
    let email = data.email;
    let firstname = data.firstname;
    var subject = "Password updated at " + config.siteName;
    let body = '<p> Hi ' + firstname + ',</p> ' +
        '<p>Your password has been updated successfully.</p>';
    emailHandler.emailToCustomers(email, subject, body);
}

function isValidCountry(country) {
    if (_.find(nationalities, { "alpha_2_code": country })) return true
    return false;
}
function isValidNationality(nationality) {
    if (_.find(nationalities, { "nationality": nationality })) return true
    return false;
}
function generateAuthenticationToken(user) {
    return jwt.sign({
        email: user.email,
        userID: user._id,
        role: user.role
    },
        secretKeys.jwtSecret
    );
}
function generateFileName(prefix, file) {
    var datetimestamp = Date.now();
    return prefix + "-" + Math.floor(10000000000 + Math.random() * 90000000000) + datetimestamp + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]
}
function isValidFile(file, allowedExtension) {
    var fileExtenstion = file.originalname.split('.')[file.originalname.split('.').length - 1];
    fileExtenstion = _.toLower(fileExtenstion);
    return (allowedExtension.indexOf(fileExtenstion) > -1);
}

function generateTwoFaUri(user) {
    return authenticator.generateTotpUri(user.twoFAFormattedKey, user.originalEmail, config.siteName, 'SHA1', 6, 30);
}

function formatNumber(number, type = '', symbol, convertDecimal = true, decimalPoints = 2) {
    if (convertDecimal) {
        number = Number(number).toFixed(decimalPoints);
    }
    number = (number) ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '';
    if (type && symbol) {
        number = (type === 'prepend') ? symbol + number : number + symbol;
    }
    return number;
}

function getUserIpAddress(req) {
    let ipAddress = '';
    if (req) {
        var userIpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var userIpAddressAr = _.split(userIpAddress, ',');
        ipAddress = (userIpAddressAr) ? userIpAddressAr[0] : '';
    }
    return ipAddress;
}

function isValidCaptcha(captchaKey, successCallback, errorCallback) {
    if (config.isCaptchEnable && captchaKey) {
        recaptcha
            .validate(captchaKey)
            .then(async function () { typeof successCallback === "function" && successCallback() })
            .catch(function (errorCodes) {
                typeof errorCallback === "function" && errorCallback(errorCodes)
                //console.log(recaptcha.translateErrors(errorCodes));
            });
    } else {
        typeof successCallback === "function" && successCallback()
    }
}

function sendContactMailNotification(data) {
    let email = data.email;
    let firstname = data.firstname;
    var subject = "Contact request received " + config.siteName;
    let body = '<p> Hi ' + firstname + ',</p> ' +
        '<p>Your contact request received successfuly. Our support team will contact you soon.</p>';
    emailHandler.emailToCustomers(email, subject, body);
}

async function processTransferTransaction(transaction, callback, user = undefined) {
    console.log("processTransaction Utils function")
    console.log("transaction details");
    console.log(transaction);
    /* Check In Wallet Addresess */
    let { sendingAddress } = transaction;
    let walletUser;
    let isResolved = false;

    walletUser = await WalletAddresses.findOne({
        address: sendingAddress
    })

    if (walletUser) {
        user = await User.findOne({
            _id: walletUser.userId
        })
    }

    if (user) {
        isResolved = true;
    }

    if (isResolved) {
        console.log("addResolvedTxn")
        addResolvedTxn(user, transaction, callback)
    } else {
        console.log("addUnresolvedTxn")
        addUnresolvedTxn(transaction, callback);
    }
}

async function addResolvedTxn(user, data, callback) {
    console.log("user");
    console.log(user);
    console.log(data);
    callback();
}

async function addUnresolvedTxn(data, callback) {
    const { txHash, sendingAddress, tokens, txDate, etherscanDetail = {} } = data;
    let unsolvedTxExists = await UnSolvedTransaction.findOne({
        tokensSendingAddress: sendingAddress,
        tokensReceivingAddress: config.tokenReceiverAddress,
        txHash: txHash,
        solvedStatus: false
    })

    if (!unsolvedTxExists) {
        var unsolvedTx = new UnSolvedTransaction();
        unsolvedTx.txHash = txHash;
        unsolvedTx.tokensSendingAddress = sendingAddress;
        unsolvedTx.tokensReceivingAddress = config.tokenReceiverAddress;
        unsolvedTx.txDetailURL = `${config.ethAddressTokenTransfer}${txHash}`;
        unsolvedTx.tokens = tokens;
        unsolvedTx.etherscanDetail = etherscanDetail;
        unsolvedTx.txDate = txDate;
        unsolvedTx.save().then(() => {
            callback();
        }).catch(e => {
            console.log("addUnresolvedTxnerror")
            console.log(e.errmsg);
            callback();
        });
    } else {
        callback();
    }
}

async function addNotification(title, notification, sectionName, sectionId, createdDate) {
    if (title && notification && sectionName && sectionId) {
        var notificationDetail = new Notification();
        notificationDetail.title = title;
        notificationDetail.notification = notification;
        notificationDetail.sectionId = sectionId;
        notificationDetail.sectionName = sectionName;
        notificationDetail.createdOnUTC = createdDate;
        await notificationDetail.save();
    }
}

async function checkAndChangePlan(user) {
    let userPlan;
    if (user.membershipPlan) {
        userPlan = user.membershipPlan;
    }
    let nearestLowerPlan = await PricingPlan.findOne({ "status": true, type: user.role, "neededTokens": { $lte: user.totalTokens } }).sort({ "neededTokens": "desc" });
    if (nearestLowerPlan) {
        if (!user.membershipPlan || (user.membershipPlan && !_.isEqual(user.membershipPlan._id, nearestLowerPlan._id))) {
            user.membershipPlan = nearestLowerPlan._id;
            await user.save();
            userPlan = nearestLowerPlan;
        }
    }
    return userPlan;
}

function sendPurchaseMembershipIPNFailedMailAdmin(data) {

    const { type, txHash = undefined } = data;
    let message = '';
    if (type === 'TRANSACTION_NOT_FOUND') {
        message = "Transaction hash not found in our database"
    }
    else if (type === 'TRANSACTION_ALREADY_PROCESSED') {
        message = "Transaction already proccessed with database"
    }
    else if (type === 'TRANSACTION_CURRENCY_MISMATCH') {
        message = "Transaction currency mismatch"
    }
    else if (type === 'TRANSACTION_AMOUNT_MISMATCH') {
        message = "Transaction amount mismatch"
    }
    else if (type === 'USER_NOT_FOUND') {
        message = "User not found for this transaction"
    }
    let subject = 'Purchase Membership Transaction Failed at ' + config.siteName;

    let body = `<p> Hi Admin,</p> ` +
        `<p>CyrptoPayment Transaction Failed!</p> <br/>` +
        + txHash ? `<p><b>Transaction Hash</b>${txHash}</p>` : '' +
        `<p><b>Reason: ${message}</b></p>`;

    emailHandler.emailToCustomers(config.AdminEmailAddress, subject, body);
    if (config.secondaryAdminEmail && config.secondaryAdminEmail !== '') {
        emailHandler.emailToCustomers(config.secondaryAdminEmail, subject, body);
    }
}

function sendPurchaseMembershipSuccessMail(data) {
    const {
        user: { originalEmail: email, firstname },
        transaction: { txnId, amountWalletCurrency, transactionWalletCurrency, transactionWallet, amountUSD, purchase: { purchaseTokens, planId, planName }, txDate },
    } = data;
    let transactionWalletCurrencyName = transactionWalletCurrency || transactionWallet;
    let subject = 'Purchase Successful at ' + config.siteName;
    if (email !== '') {
        let body = `<p> Hi ${firstname},</p> ` +
            `<p>Thank you for your purchase for ${planName} membership!</p> ` +
            `<p>You have successfully purchased ${planName} membership worth ${amountUSD} USD at <a href=${config.BaseURL}>${config.siteName}</a>` +
            `<p><b>Purchase details:</b> </p>` +
            `<p>Transaction ID: ${txnId}</p>` +
            `<p>Amount: ${amountUSD} USD ( ${amountWalletCurrency} ${transactionWalletCurrencyName} )</p>` +
            `<p>Purchase Tokens: ${purchaseTokens} XMB</p>` +
            `<p>Date: ${txDate}</p>`;
        emailHandler.emailToCustomers(email, subject, body);
    }
}

function sendPurchaseMembershipFailedMail(data) {
    const {
        user: { originalEmail: email, fullName },
        transaction: { txnId, amountWalletCurrency, transactionWalletCurrency, transactionWallet, amountUSD, purchase: { purchaseTokens, planId, planName }, txDate },
    } = data;
    let transactionWalletCurrencyName = transactionWalletCurrency || transactionWallet;

    let subject = 'Purchase Failed/Expired at ' + config.siteName;
    if (email !== '') {
        let body = `<p> Hi ${fullName},</p> ` +
            `<p>Your purchase for ${planName} membership has failed or expired!</p> ` +
            `<p>Your purchase, worth ${amountUSD} USD, for ${planName} membership is failed or expired at <a href=${config.BaseURL}>${config.siteName}</a>` +
            `<p><b>Purchase details:</b> </p>` +
            `<p>Transaction ID: ${txnId}</p>` +
            `<p>Amount: ${amountUSD} USD  ( ${amountWalletCurrency} ${transactionWalletCurrencyName} )</p>` +
            `<p>Purchase Tokens: ${purchaseTokens} XMB</p>` +
            txDate ? `<p>Date: ${txDate}</p>` : '';
        emailHandler.emailToCustomers(email, subject, body);
    }
}

function sendPurchaseMembershipPendingMail(data) {
    const {
        user: { originalEmail: email, firstname },
        transaction: { txnId, amountWalletCurrency, transactionWalletCurrency, transactionWallet, amountUSD, purchase: { purchaseTokens, planId, planName } },
    } = data;
    let transactionWalletCurrencyName = transactionWalletCurrency || transactionWallet;

    let subject = 'Membership Purchase Pending at ' + config.siteName;
    if (email !== '') {
        let body = `<p> Hi ${firstname},</p> ` +
            `<p>Your Purchase for ${planName} membership is waiting for Payment!</p> ` +
            `<p>Your Purchase is ${amountUSD} USD, for ${planName} membership is pending at <a href=${config.BaseURL}>${config.siteName}</a>` +
            `<p><b>Purchase details:</b> </p>` +
            `<p>Transaction ID: ${txnId}</p>` +
            `<p>Amount: ${amountUSD} USD  ( ${amountWalletCurrency} ${transactionWalletCurrencyName} )</p>` +
            `<p>Purchase Tokens: ${purchaseTokens} XMB</p>` +
            `<p>You can pay this payment from your Purchase Transactions from your account in <a href=${config.BaseURL}>${config.siteName}</a>.</p>` +
            `<p>If you have already paid then ignore this message and as changes will be made shortly.</p>`;

        emailHandler.emailToCustomers(email, subject, body);
    }
}

function sendPurchaseMembershipProcessingMail(data) {
    const {
        user: { originalEmail: email, firstname },
        transaction: { txnId, amountWalletCurrency, transactionWalletCurrency, transactionWallet, amountUSD, purchase: { purchaseTokens, planId, planName, standaloneServices } },
    } = data;
    let transactionWalletCurrencyName = transactionWalletCurrency || transactionWallet;
    let subject = 'Membership Purchase Processing at ' + config.siteName;
    if (email !== '') {
        let servicesNames = '';
        if (standaloneServices && !_.isEmpty(standaloneServices)) {
            _.forEach(standaloneServices, function (value, key) {
                servicesNames += value + ', ';
            })
        }
        let body = `<p> Hi ${firstname},</p> ` +
            `<p>Your purchase for ${(standaloneServices && !_.isEmpty(standaloneServices)) ? servicesNames : planName} membership is under process!</p> ` +
            `<p>We are processing your purchase, worth ${amountUSD} USD, for ${(standaloneServices && !_.isEmpty(standaloneServices)) ? servicesNames : planName} membership at <a href=${config.BaseURL}>${config.siteName}</a>` +
            `<p><b>Purchase details:</b> </p>` +
            `<p>Transaction ID: ${txnId}</p>` +
            `<p>Amount: ${amountUSD} USD  ( ${amountWalletCurrency} ${transactionWalletCurrencyName} )</p>` +
            `<p>Purchase Point: ${purchaseTokens} XMB</p>` +
            `<p>Membership Upgrade will take place shortly.</p>`;
        emailHandler.emailToCustomers(email, subject, body);
    }
}

async function checkUserOperationAllowed(user, entityName = '') {
    let returnResponse = { status: '', msg: '', operationAllowed: false };
    if (!user || !entityName) {
        returnResponse.status = 'error';
        returnResponse.msg = 'Invalid parameters passed.';
    }
    if (user.role === UserRoleEnum.ADMIN) {
        returnResponse.status = 'success';
        returnResponse.msg = 'Operation Allowed';
        returnResponse.operationAllowed = true;
    }
    else {
        const planEntities = await PlanEntity.find({ planId: user.membershipPlan, deleteStatus: false });
        const findBuySideEntity = _.find(planEntities, { "entityName": entityName });
        if (!findBuySideEntity) {
            returnResponse.status = 'error';
            returnResponse.msg = 'Invalid Request.';
        }
        if (entityName === 'buy_side_offering_submission' && user.role === UserRoleEnum.ADVISOR && findBuySideEntity.value !== 'false') {
            returnResponse.status = 'success';
            returnResponse.msg = 'Operation Allowed';
            returnResponse.operationAllowed = true;
        }
        if (entityName === 'sell_side_offering_submission') {
            const totalSubmittedOfferings = await Offering.countDocuments({
                userId: user._id,
                offeringType: OfferingEnum.OfferingTypesEnum.SELL,
                deleteStatus: false
            });
            if (findBuySideEntity.value === '-1' || totalSubmittedOfferings < findBuySideEntity.value) {
                returnResponse.status = 'success';
                returnResponse.msg = 'Operation Allowed';
                returnResponse.operationAllowed = true;
            }
        }
    }
    return returnResponse;
}

function sendWiredTransactionEmail(data) {
    let email = config.adminPaymentNotificationEmailAddress;
    if (email) {
        let subject = config.siteName + " Wired transaction request created";
        let body = '<h1 style="margin-top: 0px;">Hello Admin, </h1>' +
            '<div style="color: #636363; font-size: 14px;"><p>' +
            'New request for wired transaction has been created from ' + data.fullName + ' for amount $' + data.transactionAmount + '.</p></div>';
        emailHandler.emailToCustomers(email, subject, body);
        if (config.secondaryAdminEmail && config.secondaryAdminEmail !== '') {
            emailHandler.emailToCustomers(config.secondaryAdminEmail, subject, body);
        }
    }
}

function wiredTransactionStatuChangeEmail(data) {
    let email = data.email;
    let firstname = data.firstname;
    let status = data.status;
    let subject = config.siteName;
    let adminNote = data.adminNote;
    let body;

    if (email !== '') {
        if (status == WalletEnum.CardPaymentStatusTypes.APPROVED) {
            subject += " Wire Transfer Request Approved";
            body = '<h1 style="margin-top: 0px;">Hi ' + firstname + ', </h1>' +
                '<div style="color: #636363; font-size: 14px;"><p>' +
                'We have reviewed your wire transfer request. Your request is approved.' +
                '</p></div>';
        }
        else if (status == WalletEnum.CardPaymentStatusTypes.REJECTED) {
            subject += " Wire Transfer Request Rejected";
            body = '<h1 style="margin-top: 0px;">Hi ' + firstname + ', </h1>' +
                '<div style="color: #636363; font-size: 14px;"><p>' +
                'We have reviewed your wire transfer request. Your request is rejected.' +
                '</p></div>';
        }
        if (adminNote !== '') {
            body += '<div style="color: #636363; font-size: 14px;"><p>Note: ' + adminNote + '</p></div>';
        }
        emailHandler.emailToCustomers(email, subject, body);
    }
}

async function listZoomUsers() {

    const payload = {
        iss: config.zoomApiKey,
        exp: ((new Date()).getTime() + 5000)
    };
    const token = jwt.sign(payload, config.zoomSecretKey);
    var options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        uri: "https://api.zoom.us/v2/users/phptestingdemo@gmail.com",
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };
    rp(options).then(function (response) {
        console.log('User has', response);
    }).catch(function (err) {
        console.log('API call failed, reason ', err);
    });
}

async function createZoomMeeting(meetingData) {

    if (config.zoomApiKey && config.zoomAdminUserId && config.allowZoomAutomation === true) {
        const payload = {
            iss: config.zoomApiKey,
            exp: ((new Date()).getTime() + 5000)
        };
        const token = jwt.sign(payload, config.zoomSecretKey);
        const url = `https://api.zoom.us/v2/users/${config.zoomAdminUserId}/meetings`;
        let zoomMeetingData = {
            "topic": (meetingData && meetingData.topic) ? meetingData.topic : 'Meeting',
            "type": 2,
            "start_time": moment(meetingData.meetingDateTime),
            "timezone": "UTC",
            "settings": {
                "password": "",
                "join_before_host": true,
                "audio": "both",
                "auto_recording": "none"
            }
        };
        let stringifyData = JSON.stringify(zoomMeetingData);
        return await axios({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
            },
            data: stringifyData
        }).then(response => {
            return response.data;
        }).catch(err => {
            console.log(err);
            console.log("Some error");
            console.log("error in request", err);
        });
    }
}


async function deleteZoomMeeting(meetingDeleteId) {
    if (meetingDeleteId && config.allowZoomAutomation === true) {
        const payload = {
            iss: config.zoomApiKey,
            exp: ((new Date()).getTime() + 5000)
        };
        const token = jwt.sign(payload, config.zoomSecretKey);
        const url = `https://api.zoom.us/v2/meetings/${meetingDeleteId}`;
        return await axios({
            method: "DELETE",
            url: url,
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
            },
        }).then(response => {
            return response.data;
        }).catch(err => {
            console.log(err);
            console.log("Some error");
            console.log("error in request", err);
        });
    }
}

async function meetinCancelMailToAdmin(data) {
    if (config.AdminEmailAddress && !_.isEmpty(data)) {
        const {
            user: { firstname, lastname },
            meetingDetails: { meetingDateTime, addtionalNotes }
        } = data;
        let subject = 'Meeting cancelled by ' + firstname;
        let body = `<p> Hi Admin,</p> ` + `<p>${firstname} ${lastname} has cancelled meeting dated ${moment(meetingDateTime).format('Do MMMM YYYY, h:mm:ss a')}</p> ` + `<p>Note ${addtionalNotes}`;
        emailHandler.emailToCustomers(config.AdminEmailAddress, subject, body);
        if (config.secondaryAdminEmail && config.secondaryAdminEmail !== '') {
            emailHandler.emailToCustomers(config.secondaryAdminEmail, subject, body);
        }
    }
}

async function getLinkedinDetails(url, token) {
    if (token && url !== '') {
        return await axios({
            method: "GET",
            url: url,
            headers: {
                "auth": { "bearer": token },
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            return response.data;
        }).catch(err => {
            console.log(err);
            console.log("Some error");
            console.log("error in request", err);
        });
    }
}

function checkEmailStatusWorking() {
    let body = '<p> Hi Maksab Admin, </p> ';
    if (config.developerEmailAddress && config.developerEmailAddress !== '') {
        emailHandler.emailToCustomers("phptestingdemo@gmail.com", 'Mail Success Final 2', body);
    }
}

function sendPartialPurchaseMembershipSuccessMail(data) {
    const {
        user: { originalEmail: email, firstname },
        transaction: { transactionWalletCurrency, transactionWallet, purchase: { planId }, txDate, received_amount },
        differenceAmount,
        differenceTokens,
        paymentCurrencyType
    } = data;
    let subject = 'Purchase Successful at ' + config.siteName;
    if (email !== '') {
        let body = `<p> Hi ${firstname},</p> ` +
            `<p>Thank you for your making payment for ${planId.planName} membership!. You have made partial payment of ${received_amount} ${paymentCurrencyType} </p> ` +
            `<p><b>Please buy ${differenceTokens} XMB more to activate your ${planId.planName}</b> </p>` +
            `<p>Date: ${txDate}</p>`;
        emailHandler.emailToCustomers(email, subject, body);
    }
}

function sendIPNFailureEmailToAdmin(error) {
    let subject = 'Coinpayment IPN Failed at ' + config.siteName;
    let body = `<p> Hi Admin,</p> ` +
        `<p>Cyrpto Payment Transaction Failed!</p> <br/>` +
        `<p><b>Reason: ${error}</b></p>`;
    if (config.adminPaymentNotificationEmailAddress !== '') {
        emailHandler.emailToCustomers(config.adminPaymentNotificationEmailAddress, subject, body);
    }
    else if (config.secondaryAdminEmail && config.secondaryAdminEmail !== '') {
        emailHandler.emailToCustomers(config.secondaryAdminEmail, subject, body);
    }
}

function sendNewSignupEmailToAdmin(data) {
    let email = data.email;
    let firstname = data.firstname;
    let lastname = data.lastname;
    let phoneNumber = data.phoneNumber;
    let userType = data.userType;
    let ipAddress = data.ipAddress;
    let createdDate = data.createdDate;
    if (email !== '') {
        let subject = 'New user on Maksab Platform';
        let body = `<p> Hello Admin,</p> ` +
            `<p>New user has signed up on Maksab Platform.</p> ` +
            `<p>Name: ${firstname} ${lastname}</p> ` +
            `<p>Email: ${email}</p> ` +
            `<p>Phone Number: ${phoneNumber}</p>` +
            `<p>User Type: ${userType}</p>` +
            `<p>IP Address: ${ipAddress}</p>` +
            `<p>Created On: ${createdDate}</p>`;
        if (config.AdminEmailAddress !== '') {
            emailHandler.emailToCustomers(config.AdminEmailAddress, subject, body);
        }
        if (config.AdminEmailAddress === '' && config.secondaryAdminEmail && config.secondaryAdminEmail !== '') {
            emailHandler.emailToCustomers(config.secondaryAdminEmail, subject, body);
        }
    }
}

function sendProfileMailNotification(data) {
    let email = data.email;
    let firstname = data.firstname;
    if (email !== '' && email !== null) {
        var subject = "Complete your profile " + config.siteName;
        let body = '<p> Hi ' + firstname + ',</p> ' +
            '<p>We have indicated that your profile details were not completed. Make sure to fill in all your profile details to get your profile listed as an Maksab Advisor.</p>' +
            '<p>Registered Maksab Advisors get can earn rewards in the form of MXAB Tokens for their contribution and participation in newsfeed discussions, and more.</p>' +
            '<p>Do not hesitate to contact us at <a href="mailto:support@maksab.io">support@maksab.io</a> for any further questions.</p>';
        emailHandler.emailToCustomers(email, subject, body);
    }
}

async function addUserRating(userDetails = '') {
    let updateStatus = '';
    if (userDetails !== '') {
        const findUserRating = await UserRating.findOne({ userId: userDetails._id }).select('rating');
        if (!findUserRating) {
            const adminUserDetails = await User.findOne({ role: UserRoleEnum.ADMIN });
            if (adminUserDetails) {
                const userRating = new UserRating();
                userRating.ratedBy = adminUserDetails._id;
                userRating.userId = userDetails._id;
                userRating.rating = 1;
                updateStatus = await userRating.save();
            }
        }
    }
    return updateStatus;
}

function wiredTransactionDetailsEmail(data) {
    let email = data.email;
    let firstname = data.firstname;
    let emailDescription = data.emailDescription;
    let subject = config.siteName;
    let body;
    if (email !== '') {
        subject += "Wire transfer request notification";
        body = '<h1 style="margin-top: 0px;">Hi ' + firstname + ', </h1>' +
            '<div style="color: #636363; font-size: 14px;"><p>' +
            'Please check below mentioned details to complete your wired transfer request.' +
            '</p></div>';
        if (emailDescription !== '') {
            body += '<div style="color: #636363; font-size: 14px;"><p>' + emailDescription + '</p></div>';
        }
        emailHandler.emailToCustomers(email, subject, body);
    }
}

function sendWelcomeMailToUser(data) {
    if (data) {
        let firstname = data.firstname;
        let email = data.email;
        let password = data.password;
        let subject = 'New account created on ' + config.siteName;
        let urlLink = `${config.BaseURL}user/login`;
        let body = '<p> Hi '+ firstname +'</p> ' +
            '<p>Your account has been created on ' + config.siteName + ' platform. Login to your account by clicking the link below by provided credentials.</p><p>Email : '+ email +'</p><p>Password : '+ password +'</p>' +
            '<div style="text-align: center"><a href="' + urlLink + '" style="display: inline-block;padding: 11px 30px 6px;margin: 20px 0px 30px;font-size: 15px;color: #fff;background: #01a8fe;border-radius: 5px;">Login</a></div>';
        emailHandler.emailToCustomers(email, subject, body);
    }
}

module.exports = {
    emailProcess,
    isValidEmail,
    processUserInput,
    sendResponse,
    sendEmailVerificationCode,
    sendSubscribeVerificationCode,
    sendForgotPasswordCode,
    sendPasswordChangedEmail,
    isValidCountry,
    generateAuthenticationToken,
    generateFileName,
    isValidFile,
    isValidNationality,
    generateTwoFaUri,
    formatNumber,
    getUserIpAddress,
    isValidCaptcha,
    sendContactMailNotification,
    processTransferTransaction,
    addNotification,
    checkAndChangePlan,
    sendPurchaseMembershipIPNFailedMailAdmin,
    sendPurchaseMembershipSuccessMail,
    sendPurchaseMembershipFailedMail,
    sendPurchaseMembershipPendingMail,
    sendPurchaseMembershipProcessingMail,
    checkUserOperationAllowed,
    sendWiredTransactionEmail,
    wiredTransactionStatuChangeEmail,
    createZoomMeeting,
    listZoomUsers,
    deleteZoomMeeting,
    meetinCancelMailToAdmin,
    getLinkedinDetails,
    checkEmailStatusWorking,
    sendPartialPurchaseMembershipSuccessMail,
    sendIPNFailureEmailToAdmin,
    sendNewSignupEmailToAdmin,
    sendProfileMailNotification,
    addUserRating,
    wiredTransactionDetailsEmail,
    sendWelcomeMailToUser
}