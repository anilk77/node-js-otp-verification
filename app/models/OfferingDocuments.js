var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var OfferingDocumentsSchema = new mongoose.Schema({
    termsEngagementAdvisors: {
        type: String
    },
    termsEngagementBuyers: {
        type: String
    },
    termsEngagementSellers: {
        type: String
    },
    ioi: {
        type: String
    },
    approvePurcahseAgreement: {
        type: String
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    },
    updatedOnUTC: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String,
        default: ""
    }
}, {
    versionKey: false
});

OfferingDocumentsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('OfferingDocuments', OfferingDocumentsSchema);