const config = require('./config');
var ApiMessages = {
  editprevent: 'You can not edit this form.',
  missingParams: 'Please provide required details.',
  passwordLength: `Password should be between ${config.passwordMinCharLength} to ${config.passwordMaxCharLength} characters long.`,
  invalidEmail: 'Please enter valid email address.',
  invalidCountry: 'Please enter valid country.',
  emailAlredyRegistered: 'Email is already registered.',
  mobileNoAlredyRegistered: 'Phone nubmer is already registered.',
  somethingWentWrong: 'Something went wrong. Please try again later.',
  signUpSuccessfull: 'Successfully signed up.',
  verificationMailSent: 'An email has been sent to you for the account verification.',
  emailAlreadyVerified: "Your email is already verified.",
  linkExpiredPleaseCheckMail: "Your link is expired. We've sent you email verification link. Please check your email.",
  linkExpired: "Your link is expired.",
  accountVerified: "Account is verified. Please login again to proceed.",
  contactAdminSupportTeam: "Please contact support to verify your email or try again.",
  invalidPassword: 'Please enter valid password.',
  emailNotRegistered: 'Email is not registered.',
  incorrectPassword: 'Password is incorrect.',
  userAccountDeactived: 'Your account is deactivated. Please contact admin.',
  activationLinkSentAgain: "Your email has not been verified. We've sent you email verification link. Please check your email.",
  loginSuccess: "Logged in Successfully.",
  yourAccountIsNotActive: `Your account is not active on platform. Please contact admin on ${config.supportMail}.`,
  passwordResetLinkSent: "Password reset link successfully sent to",
  unableToVerify: "Unable to verify user password.",
  passwordChangedSuccessfully: "Password changed successfully.",
  passwordUpdatedSuccessfully: "Password successfully updated. Please login with new password.",
  invalidRecaptcha: 'Please verify that you are not a robot!',
  userNotFound: "User not found.",
  invalidCurrentPassword: 'Please enter valid current password.',
  profileUpdateVerifyEmail: 'Profile updated successfully. Please verify your email account.',
  profileUpdatedSuccess: 'Profile updated successfully',
  phoneNoAlreadyAttachedToOtherAccount: 'Phone number is already attached to another account.',
  contactRequestReceived: 'Contact request received successfully.',
  userAddedSuccessfully: 'User added successfully.',
  stageSavedSuccessfully: 'Stage saved successfully.',
  stageAlredyExists: 'Stage already exists.',
  sectorAlredyExists: 'Sector already exists.',
  sectorSavedSuccessfully: 'Sector saved successfully.',
  userDeletedSuccessfully: 'User deleted successfully.',
  moneyValuationSavedSuccessfully: 'Money valuation saved successfully.',
  moneyValuationAlredyExists: 'Money valuation already exists.',
  eligibleTaxAlredyExists: 'Eligible tax already exists.',
  eligibleTaxSavedSuccessfully: 'Eligible tax saved successfully.',
  lastYearAlredyExists: 'Last year already exists',
  lastYearSavedSuccessfully: 'Last year saved successfully.',
  investmentStageAlredyExists: 'Investment stage already exists.',
  investmentStageSavedSuccessfully: 'Investment stage saved successfully.',
  boardRequirementAlredyExists: 'Board requirement already exists.',
  boardRequirementSavedSuccessfully: 'Board requirement saved successfully.',
  investmentSizeAlredyExists: 'Investment size already exists.',
  investmentSizeAddedSuccessfully: 'Investment size added successfully.',
  cashInvestmentAlredyExists: 'Cash investment already exists.',
  cashInvestmentSavedSuccessfully: 'Cash Investment saved successfully.',
  contactTitleAlredyExists: 'Contact title already exists.',
  contactTitleSavedSuccessfully: 'Contact title saved successfully.',
  inquiryDeletedSuccessfully: 'Inquiry deleted successfully.',
  recordDeletedSuccessfully: 'Record deleted successfully.',
  generalDetailsSavedSuccessfully: 'General details saved successfully.',
  generalDetailsNotFound: 'Gneral details not found.',
  profileAvtarUpdatedSuccess: 'Profile avatar uploaded successfully.',
  dueDiligenceSavedSuccessfully: 'Due diligence details updated successfully.',
  diligneceDetailsNotFound: 'Diligence details not found.',
  offeringsSavedSuccessfully: 'Offering Saved Successfully.',
  offeringsDeletedSuccessfully: 'Offerings deleted successfully.',
  permissionDenied: 'You do not have permission to edit offering.',
  offeringAddedToFavourites: 'Offering added to favourites successfully.',
  offeringRemovedFromFavourites: 'Offering removed from favourites successfully.',
  addressProofUpdatedSuccess: 'Address proof updated successfully.',
  identityProofUpdatedSuccess: 'Identity proof updated successfully.',
  fileNotDeleted: 'File not removed successfully.',
  fileRemovedSuccess: 'File removed successfully.',
  kycStatusUpdatedSuccess: 'Status updated successfully.',
  meetingDetailsNotSaved: 'Meeting details not saved successfully.',
  meetingDetailsSaved: 'Meeting details saved successfully.',
  subscribe: 'Subscribed sucessfully. Verify your email by click on link we sent to you in email',
  sendingVerifyEmail: "We have sent you mail to verify your subscription please veriy using link in the mail",
  alreadySubscribed: 'You are already subscribed.',
  subscriberVerified: 'Your subscription verified successfully.',
  subscribersDeletedSuccessfully: 'Subscribers deleted successfully.',
  emailAlreadySubscribed: 'You are already subscribed with us.',
  subscribersDetailsUpdatedSuccessfully: 'Subscriber details updated successfully.',
  sucess: 'Sucess',
  newsfeedLiked: 'Newsfeed liked successfully.',
  Unlike: 'Newsfeed unliked successfully.',
  offeringDocumentUpdated: 'Offering documents updated successfully.',
  documentDeletedSuccessfully: 'Document deleted successfully.',
  addressAlreadyUsed: "This address belongs to another user",
  walletAddressAddedSuccess: 'Wallet address added successfully.',
  walletAddressUpdatedSuccess: 'Wallet address updated successfully.',
  walletAddressDeletedSuccess: 'Wallet address deleted successfully.',
  walletAddressNotDeleted: 'Wallet address not deleted successfully. Please try again.',
  offeringDetailsNotFound: 'Offering details not found.',
  walletAddressNotExist: 'Wallet address not exist.',
  taskAlreadyExists: 'Task already exists.',
  taskAddedSuccessfully: 'Task added successfully.',
  taskDetailsNotFound: 'Task details not found.',
  taskStatusUpdated: 'Task status updated.',
  notificationsRemovedSuccessfully: 'Notifications removed successfully.',
  offeringDeletedSuccessfully: 'Offering deleted successfully.',
  youAreNotAuthorized: 'Invalid access. You are not authorised to perform this action.',
  folderAddError: 'Folder is not added successfully. Please try again later.',
  contactRequestAddedSuccessfully: 'Contact request added successfully.',
  pricingPlansNotFound: 'Pricing plans not found.',
  transactionNotFound: 'Transaction not found.',
  invalidRequest: 'Invalid request.',
  transactionAlreadyProcessed: 'Transaction already processed!',
  originalCurrencyMismatch: 'Original currency mismatch!',
  amountisLessThenOrderTotal: 'Amount is less than order total!',
  notAllowedToCreateBuySideOffering: 'You are not allowed to create buy side offering.',
  notAllowedToCreateSellSideOffering: 'You are not allowed to create sell side offering.',
  manualTransactionNotCreatedSuccess: 'Manual transaction not created successfully.',
  wiredTransferRequestCreatedSuccess: 'Request created successfully. You will receive email instructions from admin to complete transaction.',
  manualRequestAlreadyCreated: 'Wired transfer request is already in processing stage, Please wait for action from admin on it.',
  wiredTransactionApproved: 'Transaction approved successfully.',
  wiredTransactionRejected: 'Transaction has been rejected.',
  standaloneServicesNotFound: 'Stand alone services not found.',
  dueDigilenceUpdatedSuccess: 'Due digilence details updated suceessfully.',
  userDetailsNotFound: 'User details not found.',
  meetingDetailsSavedSuccessfully: 'Meeting details saved successfully.',
  meetingsDeletedSuccessfully: 'Meetings deleted successfully.',
  meetingDetailsNotFound: 'Meeting details not found.',
  meetingCancelledSuccessfully: 'Meeting cancelled successfully.',
  meetingAlreadyExistInThisTimeFrame: 'Please select other time. User is already having meeting on this time frame.',
  invalidReceiverDetails: 'Meeting receiver details not found.',
  insufficientTokensForMeeting: 'You do not have sufficient tokens for creating meeting.',
  canNotCreateMeetingWithSelf: 'You can not create meeting with self.',
  insufficientTokens: 'You does not have sufficient tokens to submit IOI.',
  prospectDetailsNotFound: 'Prospect details not found.',
  prospectDeletedSuccessfully: 'Prospect deleted successfully.',
  emailAlreadyAttachedToOtherAccount: 'Email is already attached to another account. Please use other email id.',
  avatarRemoved: 'Avatar removed successfully.',
  detailsNotSavedSuccess: 'Details not saved successfully.',
  offeringsClosedSuccessfully: 'Offering closed successfully.',
  qualifiedDetailsNotFound: 'User qualified details not found.',
  folderNotExistWithUser: 'Folder details not found.',
  folderRemovedSuccessfully: 'Folder deleted successfully.',
  errorInFolderDelete: 'There is error in folder delete. Please try again later.',
  fileNotExist: 'File not exists.',
  errorInFileDelete: 'File delete operation failed. Please try again later.',
  invalidOperation: 'Invalid Operation.',
  folderDoesNotExists: 'Folder does not exists',
  fileAddedSuccessfully: 'File added successfully.',
  fileRemovedSuccessfully: 'File removed successfully.',
  filenameRequired: 'Please enter valid file name.',
  qualifyDetailsUpdatedSuccess: 'Qualify details updated successfully.',
  qualifyAdvisorsDetailsNotFound: 'Qualify advisor details not found.',
  qualifySignatureRemovedSuccessfully: 'Qualify signature removed successfully.',
  userDiligenceDetailsNotFound: 'Diligence details not found.',
  diligenceSignatureRemovedSuccessfully: 'Diligence signature removed successfully.',
  emailIsNotRetrieved: 'User details not found from linkedin account. Please try again with different account.',
  profileDetailsUpdatedSuccessfully: 'Your profile details updated successfully.',
  tokenNotRetrieved: 'Linkedin token is not valid. Please try again later.',
  linkedinAccountDetailsNotRetrieved: 'Account details not retrieved from linkedin. Please try again later.',
  dataroomFolderAddedSuccess: 'Data room folder added successfully.',
  folderAlreadyExists: 'Folder already exists in data room.',
  offeringNotFound: 'Offering not found.',
  offeringStatusUpdated: 'Offering status updated.',
  newsfeedUnlikedSuccess: 'Newsfeed unliked successfully.',
  newsfeedNotFound: 'Newsfeed details not found.',
  commentNotPostedSuccess: 'Comment not posted successfully. Please try again later.',
  commentDetailsNotFound: 'Comment details not found.',
  commentNotSavedSuccess: 'Comment not saved successfully. Please try again later.',
  commentDeletedSuccess: 'Comment deleted successfully.',
  commentAddedSuccess: 'Comment added successfully.',
  newsfeedNotUnliked: 'Newsfeed not unliked successfully. Please try again later.',
  newsfeedNotliked: 'Newsfeed not liked successfully. Please try again later.',
  newsfeedAddedSuccess: 'Newsfeed added successfully.',
  unabletoUploadAvatar: 'We are unable to upload profile avatar. Please try again later.',
  pleaseUploadAvatar: 'Please upload avatar.',
  invalidNewsfeedDescription: 'Please enter valid newsfeed description.',
  invalidOfferingAccess:'Offering details not found.',
  ownOfferingProspectError:'You can not show interest on your own offering.',
  planOrderSuccess:'Order created successfully.',
  kycDocumentRemovedSuccess:'KYC document removed successfully.',
  ownRatingNotAllowed:'You can not rate yourself.',
  ratingSuccessfull:'You have rated advisor successfully.',
  fileAlreadyExists:'File already exist in same data room folder.',
  fundingAmountSavedSuccess: 'Funding amount saved successfully.',
  prospectNotFound: 'Prospect not found for this offering.',
  paymentRequestDetailsNotFound: 'Payment request details not found.',
  manualTransactionNotUpdatedSuccess: 'Payment proof not uploaded. Please upload it again.',
  paymentProofUploadedSuccess: 'Payment proof file uploaded successfully.',
  userDeactivatedSuccessfully: 'Your account deactivated successfully.',
  userActivatedSuccessfully: 'User account activated successfully.'
};

module.exports = ApiMessages;