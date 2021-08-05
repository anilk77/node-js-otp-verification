var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");

var collectionName = 'planentity';
var PlanEntitySchema = new mongoose.Schema({
	planId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PricingPlan"
	},
	entityName: {
		type: String
	},
	entityDescription: {
		type: String
	},
	tooltip: {
		type: String
	},
	value: {
		type: String
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

PlanEntitySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("PlanEntity", PlanEntitySchema, collectionName);