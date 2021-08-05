var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var CommentSchema = new mongoose.Schema({
	userId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User'
	},
	parentId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Comment',
	},
	comment : {
		type : String
	},
	newsfeedId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'NewsFeed'
	},
	deleteStatus: {
		type: Boolean,
		default: false
	},
	createdOnUTC: {
		type: Date,
		default: Date.now
	},
})
CommentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', CommentSchema);