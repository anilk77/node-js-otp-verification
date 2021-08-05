var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var ProspectSchema = new mongoose.Schema({
	current: {
		type: Number
	},
	buySideKnownAs: {
		type: String
	},
	ebitdaMultiples: {
		type: String
	},
	email: {
		type: String
	},
	telephone: {
		type : String
	},
	forAttentionOf: {
		type: String
	},
	investmentRangeFrom: {
		type: String
	},
	investmentRangeTo: {
		type: String
	},
	moreAboutBuySide: {
		type: String
	},
	representedBy: {
		type: String
	},
	signature: {
		type: String
	},
	understandText: {
		type: String
	},
	valuationFrom: {
		type: String
	},
	valuationTo: {
		type: String
	},
	offeringId : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Offering'
	},
	userId : {
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
	paid: {
		type: Boolean,
		default: false
	}

})

ProspectSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Prospect', ProspectSchema);