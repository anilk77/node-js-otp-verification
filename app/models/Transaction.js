var mongoose = require('mongoose');
var _ = require('lodash');
var orderNo = require("order-no")
const mongoosePaginate = require('mongoose-paginate-v2');
var TransactionEnum = require('../enums/TransactionEnum');
var WalletEnum = require('../enums/WalletEnum');

/* 
Params 
userId: User sender id  
advisorId: Advisor id in case of 
*/

var TransactionSchema = new mongoose.Schema({
	txnId: {
		type: String,
		unique: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	offeringId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Offering'
	},
	advisorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	cardRequestId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CardPaymentRequest'
	},
	txHash: {
		type: String
	},
	tokens: {
		type: Number,
		default: 0
	},
	txDetailURL: {
		type: String
	},
	transactionWallet: { type: String, enum: _.keys(WalletEnum.WalletTypeEnum), default: WalletEnum.WalletTypeEnum.ETH },
	transactionWalletCurrency: {
		type: String
	},
	transactionType: {
		type: String,
		enum: _.keys(TransactionEnum.transactionTypesEnum),
		default: TransactionEnum.transactionTypesEnum.BUY_OFFERING
	},
	sendingAddress: {
		type: String,
		trim: true
	},
	amountUSD: { type: Number, default: 0 },
	amountWalletCurrency: { type: Number, default: 0 },
	purchase: {
		planId: { type: mongoose.Schema.Types.ObjectId, ref: 'PricingPlan' },
		standaloneServices: [{
			serviceName: { type: String },
			tokens: { type: Number },
			serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'StandaloneService' }
		}],
		planName: { type: String },
		purchaseTokens: { type: Number, default: 0 },
		userAvailableTokens: { type: Number, default: 0 },
		planPriceUSD: { type: Number },
		requiredTokens: { type: Number },
		coinpaymentResponse: {
			type: Object
		},
		coinpaymentIPNResponse: {
			type: Object
		},
		expirationDate: {
			type: Date,
		},
		type: {
			type: String
		}
	},
	status: {
		type: String,
		enum: _.keys(TransactionEnum.transactionStatusEnum),
		default: TransactionEnum.transactionStatusEnum.PENDING
	},
	txDate: {
		type: Date,
	},
	coinpaymentProcessed: {
		type: Boolean,
		default: false
	},
	createdOnUTC: {
		type: Date,
		default: Date.now
	},
}, {
		versionKey: false
	});

TransactionSchema.methods.generateTxnId = async function () {
	let txnId = orderNo.makeOrderNo(1, 5);
	let transaction = await this.constructor.findOne({ txnId })
	if (transaction) {
		return this.generateTxnId();
	} else {
		return txnId;
	}
};
TransactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Transaction', TransactionSchema);