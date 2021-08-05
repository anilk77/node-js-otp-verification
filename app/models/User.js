var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var _ = require('lodash');
var crypto = require('crypto');

var { UserRoleEnum, UserKycStatusEnum } = require('./../enums/UserRoleEnum');
var UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    originalEmail: {
        type: String
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    twoFAStatus: {
        type: Boolean,
        default: false
    },
    twoFAFormattedKey: {
        type: String,
    },
    toTpUri: {
        type: String,
    },
    role: {
        type: String,
        enum: _.keys(UserRoleEnum)
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    country: {
        type: String
    },
    location: {
        type: String
    },
    profession: {
        type: String
    },
    occupation: {
        type: String
    },
    industry: {
        type: String
    },
    sectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector'
    },
    description: {
        type: String
    },
    tokensPerMinute: {
        type: Number
    },
    linkedinLink: {
        type: String
    },
    twitterLink: {
        type: String
    },
    avatar: {
        type: String
    },
    listStatus: {
        type: Boolean,
        default: true
    },
    qualifiedStatus: {
        type: String,
        enum: _.keys(UserKycStatusEnum),
        default: UserKycStatusEnum.NOTVERIFIED
    },
    addressProofFile: {
        type: String
    },
    addressProofStatus: {
        type: String,
        enum: _.keys(UserKycStatusEnum),
        default: UserKycStatusEnum.NOTVERIFIED
    },
    identityProofFile: {
        type: String
    },
    identityProofStatus: {
        type: String,
        enum: _.keys(UserKycStatusEnum),
        default: UserKycStatusEnum.NOTVERIFIED
    },
    dueDiligenceStatus: {
        type: String,
        enum: _.keys(UserKycStatusEnum),
        default: UserKycStatusEnum.NOTVERIFIED
    },
    linkedinProvider: {
        type: {
            id: String,
            token: String,
            isLoggedin: { type: Boolean, default: false },
            profileDetailsFilled: { type: Boolean, default: false },
            avatarImageUrl: String
        }
    },
    membershipPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PricingPlan'
    },
    termsOfEngagementSubmitted: {
        type: Boolean,
        default: false
    },
    termsOfEngagementFile: {
        type: String
    },
    totalTokens: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number
    },
    cvFile: {
        type: String
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    },
    updatedOnUTC: {
        type: Date,
        default: Date.now
    },
    profileCompleted: {
        type: Boolean,
        default: false
    },
    lastReminderDateOnUTC: {
        type: Date,
        default: Date.now
    },
    totalProfileReminder:{
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    deleteStatus: {
        type: Boolean,
        default: false
    },
    ipAddress: {
        type: String,
        default: ""
    }
}, {
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    if (user.isModified('password') && user.password) {
        var hash = crypto.createHash('md5').update(user.password).digest('hex');
        user.password = hash;
    }
    next();
});
UserSchema.methods.verifyPassword = function (password) {
    return this.password == crypto.createHash('md5').update(password).digest('hex');
};

/*UserSchema.statics.upsertLinkedinUser = async function (accessToken, refreshToken, profile, cb) {
    var that = this;
    let email, originalEmail;
    email = originalEmail = profile.emails[0].value;
    email = utils.emailProcess(email);
    if (!email) {
        return cb('error', null);
    }
    try {
        let isEmailUser = await this.findOne({ $and: [{ email: email }, { deleteStatus: false }] });
        if (!isEmailUser) {
            var newUser = new that();
            newUser.firstname = profile.displayName;
            newUser.email = email;
            newUser.originalEmail = originalEmail;
            newUser.password = null;
            newUser.role = UserRoleEnum.ADVISOR;
            newUser.isEmailVerified = true;
            newUser.status = true;
            newUser.deleteStatus = false;
            newUser.createdOnUTC = moment(new Date());
            newUser.updatedOnUTC = moment(new Date());
            newUser.linkedinProvider = {
                id: profile.id,
                token: accessToken,
                isLoggedin: true
            }
            isEmailUser = await newUser.save();
        } else {
            isEmailUser.linkedinProvider = {
                id: profile.id,
                token: accessToken,
                isLoggedin: true
            }
        }
        await isEmailUser.save();
        return cb(null, isEmailUser);
    }
    catch (err) {
        return cb(err, null);
    }
};*/

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);