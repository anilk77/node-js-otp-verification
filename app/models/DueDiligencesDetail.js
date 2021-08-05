var mongoose = require('mongoose');
var DueDiligencesDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    digilenceDetails: [{
        digilenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'DueDiligence' },
        answer: { type: Boolean }
    }],
    comment: {
        type: String
    },
    dueDiligenceSignature: {
        type: String
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    },
    updatedOnUTC: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('DueDiligencesDetail', DueDiligencesDetailsSchema);