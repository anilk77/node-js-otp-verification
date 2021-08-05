var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var AdminTaskSchema = new mongoose.Schema({
    task: {
        type: String
    },
    pendingStatus: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date
    },
    createdOnUTC: {
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

AdminTaskSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('AdminTask', AdminTaskSchema);