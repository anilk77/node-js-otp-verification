var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var UnSolvedTransactionSchema = new mongoose.Schema({
    txHash: {
        type: String
    },
    tokensSendingAddress: {
        type: String,
        trim: true
    },
    tokensReceivingAddress: {
        type: String,
        trim: true
    },
    offeringId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offering'
    },
    advisorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    txDetailURL: {
        type: String
    },
    tokens: {
        type: Number,
        default: 0
    },
    solvedStatus: {
        type: Boolean,
        default: false
    },
    etherscanDetail: {
        type: Object
    },
    txDate: {
        type: Date,
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});

UnSolvedTransactionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('UnSolvedTransaction', UnSolvedTransactionSchema);