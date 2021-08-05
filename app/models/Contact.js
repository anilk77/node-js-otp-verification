var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var ContactSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    message: {
        type: String
    },
    ipAddress: {
        type: String
    },
    createdOnUTC: {
        type: Date,
        default: Date.now
    },
    deleteStatus:{
        type:Boolean,
        default:false
    }   
}, {
    versionKey: false
});
ContactSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Contact', ContactSchema);