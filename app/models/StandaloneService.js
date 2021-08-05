var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
var collectionName = 'standaloneservices';
var StandaloneServicesSchema = new mongoose.Schema({
	title: {
		type: String
	},
	subTitle: {
		type: String
	},
	name: {
		type: String
	},
	description: {
		type: String
	},
	tokens: {
		type: Number
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
	}
});

StandaloneServicesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("StandaloneService", StandaloneServicesSchema, collectionName);