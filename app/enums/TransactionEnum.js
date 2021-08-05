var transactionStatusEnum = {
	PENDING: "PENDING",
	PAYMENTPENDING: "PAYMENTPENDING",
	PAYMENTPROCESSING: "PAYMENTPROCESSING",
	SUCCESS: "SUCCESS",
	FAILED: "FAILED",
};

var transactionSentStatusEnum = {
	PENDING: "PENDING",
	PAYMENTPROCESSING: "PAYMENTPROCESSING",
	SUCCESS: "SUCCESS",
};

var transactionTypesEnum = {
	BUY_OFFERING: "BUY_OFFERING",
	SELL_OFFERING: "SELL_OFFERING",
	ADVISOR_MEMBERSHIP: "ADVISOR_MEMBERSHIP",
	ADVISOR_HIRE: "ADVISOR_HIRE",
	PURCHASE: "PURCHASE",
	TOKEN_PURCHASE: "TOKEN_PURCHASE",
};

var transactionStatusText = {
	PENDING: "Pending",
	PAYMENTPENDING: "Pending",
	PAYMENTPROCESSING: "Processing",
	SUCCESS: "Success",
	FAILED: "Failed",
};

module.exports = { transactionStatusEnum, transactionTypesEnum, transactionSentStatusEnum, transactionStatusText };