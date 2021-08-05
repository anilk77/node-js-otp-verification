var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var LastYearSchema = new mongoose.Schema({
    title: {
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

LastYearSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('LastYear', LastYearSchema);