var mongoose = require('mongoose');
var _ = require('lodash');
var mongoosePaginate = require('mongoose-paginate-v2');
var WalletEnum = require("../enums/WalletEnum");

const CardPaymentRequestSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required.'],
	},
	membershipPlanId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PricingPlan'
	},
	standaloneServices: [{
		serviceName: { type: String },
		tokens: { type: Number },
		serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'StandaloneService' }
	}],
	isTokenPurchase: {
		type: Boolean
	},
	transactionAmount: {
		type: Number
	},
	requiredTokens: {
		type: Number
	},
	userNote: {
		type: String
	},
	adminNote: {
		type: String
	},
	paymentProof: {
		type: String
	},
	status: {
		type: String,
		enum: _.keys(WalletEnum.CardPaymentStatusTypes),
		default: WalletEnum.CardPaymentStatusTypes.PENDING
	},
	ipAddress: {
		type: String
	},
	createdOnUTC: {
		type: Date
	},
	updatedOnUTC: {
		type: Date
	},
	detailSentStatus: {
		type: Boolean,
		default: false
	},
	deleteStatus: {
		type: Boolean,
		default: false
	}
});
CardPaymentRequestSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('CardPaymentRequest', CardPaymentRequestSchema);