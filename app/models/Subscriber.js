var mongoose = require('mongoose');
var mongoosePaginate = require("mongoose-paginate-v2");
var { subscribeStatusEnum } = require('./../enums/UserRoleEnum');
var _ = require('lodash');
var SubscriberSchema = new mongoose.Schema({
    email: {
        type: String
    },
    status: { type: String, enum: _.keys(subscribeStatusEnum), default: subscribeStatusEnum.UNCONFIRMED },
    deleteStatus: {
        type: Boolean,
        default: false
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    }
})
SubscriberSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Subscriber', SubscriberSchema);