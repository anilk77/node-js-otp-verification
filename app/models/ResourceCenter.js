var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var ResourceCenterSchema = new mongoose.Schema({
	title: {
		type: String
	},
	image: {
		type: String
	},
	video: {
		type: String
	},
	description: {
		type: String
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	modifiedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	isForPartener: {
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
	deleteStatus: {
		type: Boolean,
		default: false
	}
})
ResourceCenterSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ResourceCenter', ResourceCenterSchema);