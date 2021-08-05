var mongoose = require('mongoose');

var WalletAddressesSchema = new mongoose.Schema({
	address: {
		type: String,
		trim: true
	},
	originalAddress: {
		type: String,
		trim: true
	},
	userId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	updateDate: {
		type: Date
	},
	ipAddress: {
		type: String,
	}
}, {
	versionKey: false
});

// Export the Mongoose model
module.exports = mongoose.model('WalletAddresses', WalletAddressesSchema);
