var passport = require('passport');
var User = require("./..//models/User");
//var LinkedInTokenStrategy = require('passport-linkedin-token').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var config = require("./config");

module.exports = function () {
    passport.use(new LinkedInStrategy({
        clientID: config.linkedinAuth.clientID,
        clientSecret: config.linkedinAuth.clientSecret
    },
        function (accessToken, refreshToken, profile, done) {
            User.upsertLinkedinUser(accessToken, refreshToken, profile, function (err, user) {
                return done(err, user);
            });
        }));
};
