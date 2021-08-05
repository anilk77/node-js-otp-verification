var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var DataRoomFolderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	offeringId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Offering'
	},
	folderName: {
		type: String
	},
	status: {
		type: Boolean,
		default: true
	},
	createdOnUTC: {
		type: Date,
		default: Date.now
	},
	deleteStatus: {
		type: Boolean,
		default: false
	}
});
DataRoomFolderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('DataRoomFolder', DataRoomFolderSchema);