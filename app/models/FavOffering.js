var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
var FavOfferingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	OfferingId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Offering"
	}
})

FavOfferingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("FavOffering", FavOfferingSchema);