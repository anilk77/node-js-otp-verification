var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var LikeSchema = new mongoose.Schema({
	userId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User'
	},
	newsfeedId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'NewsFeed'
	},
	createdOnUTC: {
		type: Date,
		default: Date.now
	},
})
LikeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Like', LikeSchema);