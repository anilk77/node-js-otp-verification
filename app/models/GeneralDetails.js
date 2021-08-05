var mongoose = require('mongoose');
var GeneralDetailsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    ioiAmount: {
        type: Number
    },
    buyOfferingTokens: {
        type: Number
    },
    sellOfferingTokens: {
        type: Number
    },
    ratingOneTokens: {
        type: Number
    },
    ratingTwoTokens: {
        type: Number
    },
    ratingThreeTokens: {
        type: Number
    },
    ratingFourTokens: {
        type: Number
    },
    ratingFiveTokens: {
        type: Number
    },
    nonDisclosureAgreement: { 
        type: String 
    },
    status: {
        type: Boolean,
        default: true
    },
    deleteStatus: {
        type: Boolean,
        default: false
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    },
    updatedOnUTC: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('GeneralDetails', GeneralDetailsSchema);