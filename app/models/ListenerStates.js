var mongoose = require('mongoose');
var ListenerStatesSchema = new mongoose.Schema({
    ethBlockHeight: {
        type: Number
    },
    contractAddress: {
        type: String,
        trim: true,
    },
    networkId: {
        type: Number,
        default: 1,
    },
    CreatedOnUTC: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
module.exports = mongoose.model('ListenerStates', ListenerStatesSchema);