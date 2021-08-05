var mongoose = require('mongoose');
var _ = require('lodash');
var UserRoleEnum = require("../enums/UserRoleEnum");

var QualifyAdvisorSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	clientName: {
		type: String
	},
	companyRisk: {
		type: String
	},
	countryRisk: {
		type: String
	},
	creditRisk: {
		type: String
	},
	currencyRisk: {
		type: String
	},
	inflationRisk: {
		type: String
	},
	interestRateRisk: {
		type: String
	},
	liquidityRisk: {
		type: String
	},
	volatilityRisk: {
		type: String
	},
	marketRisk: {
		type: String
	},
	activeInFinancialMarketAndInvestment: {
		type: String
	},
	portfolio: {
		type: Array
	},
	marketFrequency: {
		type: String
	},
	undertakenTransactionType: {
		type: Array
	},
	investmentSize: {
		type: Array
	},
	relaventQualification: {
		type: Array
	},
	experiance: {
		type: String
	},
	academicBackground: {
		type: String
	},
	resume: {
		type: String
	},
	qualifiedStatus: {
		type: String,
		enum: _.keys(UserRoleEnum.UserQualifiedStatusEnum),
		default: UserRoleEnum.UserQualifiedStatusEnum.PENDING
	},
	qualifiedSignature: {
		type: String
	},
})

module.exports = mongoose.model('QualifyAdvisor', QualifyAdvisorSchema);