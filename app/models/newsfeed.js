var mongoose = require('mongoose');
var _ = require("lodash");
var mongoosePaginate = require('mongoose-paginate-v2');
// var Like = require('./Like');
// var Comment = require('./Comment');
var NewsFeedSchema = new mongoose.Schema({
	description: {
		type: String,
	},
	file: {
		type: String
	},
	fileType: {
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
	},
})

NewsFeedSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('NewsFeed', NewsFeedSchema);