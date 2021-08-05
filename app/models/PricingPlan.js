var mongoose = require("mongoose");
var _ = require("lodash");
var mongoosePaginate = require("mongoose-paginate-v2");
var UserRoleEnum = require("../enums/UserRoleEnum");

var collectionName = 'pricingplan';

var PricingPlanSchema = new mongoose.Schema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	neededTokens: {
		type: Number
	},
	type: {
		type: String,
		enum: _.keys(UserRoleEnum.UserRoleEnum),
		default: UserRoleEnum.UserRoleEnum.ADVISOR
	},
	status: {
		type: Boolean,
		default: true
	},
	deleteStatus: {
		type: Boolean,
		default: false
	},
	isPartener: {
		type: Boolean,
		default: false
	},
	createdOnUTC: {
		type: Date,
		default: Date.now
	}
});

PricingPlanSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("PricingPlan", PricingPlanSchema, collectionName);