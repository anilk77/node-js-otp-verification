var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var ContactTitleSchema = new mongoose.Schema({
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

ContactTitleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ContactTitle', ContactTitleSchema);