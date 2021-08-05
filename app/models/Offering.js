var mongoose = require("mongoose");
var _ = require("lodash");
var mongoosePaginate = require("mongoose-paginate-v2");
var OfferingEnum = require("../enums/OfferingEnum");

var OfferingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	buySideOffering: {
		seeking: {
			type: String
		},
		targetBusiness: {
			type: String
		},
		targetGeoLocation: {
			type: String
		},
		targetRevenue: {
			type: String
		},
		stakeRequired: {
			type: String
		},
		moreAboutBuySide: {
			type: String
		}
	},
	sellSideOffering: {
		offeringName: {
			type: String
		},
		tradingName: {
			type: String
		},
		registrationNo: {
			type: String
		},
		companyIntroduction: {
			type: String
		},
		juridiction: {
			type: String
		},
		tradingAddress: {
			type: String
		},
		city: {
			type: String
		},
		state: {
			type: String
		},
		country: {
			type: String
		},
		zipcode: {
			type: String
		},
		website: {
			type: String
		},
		contacttitle: {
			type: String
		},
		contactFirstName: {
			type: String
		},
		contactLastName: {
			type: String
		},
		contactTelephone: {
			type: String
		},
		contactMobileNo: {
			type: String
		},
		contactEmail: {
			type: String
		},
		contactPosition: {
			type: String
		},
		referral: {
			type: String
		},
		fundingAmount: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "InvestmentSize"
		},
		preMoneyValuationExpectation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MoneyValuation"
		},
		eligibleTax: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EligibleTax"
		},
		salesLastYear: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "LastYear"
		},
		stage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Stage"
		},
		cashInvestmentToDate: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CashInvestment"
		},
		sector: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sector"
		},
		boardRequirement: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BoardRequirement"
		},
		businessPlanFile: {
			type: String
		},
		financialProjectFile: {
			type: String
		},
		informationMemorandumFile: {
			type: String
		},
		financialModelFile: {
			type: String
		},
		keyAchievements: {
			type: String
		},
		videoUrl: {
			type: String
		},
		posterImage: {
			type: String
		},
		logo: {
			type: String
		},
		certificateOfIncorporationFile: {
			type: String
		},
		latestAuditedFinancialStatementsFile: {
			type: String
		},
		corporateStructureFile: {
			type: String
		},
		boardOfDirectoryFile: {
			type: String
		},
		sellSideTermFile: {
			type: String
		},
		stepsCompleted: {
			type: Number,
		},
	},
	offeringType: {
		type: String,
		enum: _.keys(OfferingEnum.OfferingTypesEnum),
		default: OfferingEnum.OfferingTypesEnum.BUY
	},
	financialHighlights: [{
		year: { type: String },
		revenue: { type: String },
		netProfit: { type: String }
	}],
	status: {
		type: String,
		enum: _.keys(OfferingEnum.OfferingStatusEnum),
		default: OfferingEnum.OfferingStatusEnum.DEACTIVE
	},
	closedStatus: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	updateDate: {
		type: Date
	},
	deleteStatus: {
		type: Boolean,
		default: false
	}
});

OfferingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Offering", OfferingSchema);