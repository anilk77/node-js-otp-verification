var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var DataRoomFileSchema = new mongoose.Schema({
	folderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'DataRoomFolder'
	},
	fileName: {
		type: String
	},
	filePath: {
		type: String
	},
	Status: {
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
DataRoomFileSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('DataRoomFile', DataRoomFileSchema);