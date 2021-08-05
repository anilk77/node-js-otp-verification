var mongoose = require('mongoose');

var DueDiligencesSchema = new mongoose.Schema({
    question: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    },
    updatedOnUTC: {
        type: Date,
        default: Date.now
    },
    deleteStatus: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('DueDiligence', DueDiligencesSchema);