var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var MeetingSchema = new mongoose.Schema({
    meetingId: {
        type: String
    },
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    offeringId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offering"
    },
    duration: {
        type: String
    },
    meetingDateTime: {
        type: Date
    },
    meetingEndTime: {
        type: Date
    },
    addtionalNotes: {
        type: String
    },
    meetingStartLink: {
        type: String
    },
    meetingJoinLink: {
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
    ipAddress: {
        type: String,
        default: ""
    },
    zoomMeetingDetails: {
        type: Object
    }
}, {
    versionKey: false
});

MeetingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Meeting', MeetingSchema);