var mongoose = require('mongoose');
var mongoosePaginate = require("mongoose-paginate-v2");

var UserRatingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	ratedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	rating: {
		type: Number,
	},
	createdOnUTC: {
		type: Date,
		default: Date.now
	},
	deleteStatus: {
		type: Boolean,
		default: false
	}
})

UserRatingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('UserRating', UserRatingSchema);