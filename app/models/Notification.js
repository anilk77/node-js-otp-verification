var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var NotificationSchema = new mongoose.Schema({
    title: {
        type: String
    },
    notification: {
        type: String
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offering"
    },
    sectionName: {
        type: String
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

NotificationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Notification', NotificationSchema);