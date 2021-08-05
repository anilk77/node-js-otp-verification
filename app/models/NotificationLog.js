var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var NotificationLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lastNotificationDateOnUTC: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

NotificationLogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('NotificationLog', NotificationLogSchema);