const userListColumns = [
    { title: "#", width: { wpx: 35 } },
    { title: "First Name", width: { wpx: 150 } },
    { title: "Last Name", width: { wpx: 150 } },
    { title: "Role", width: { wpx: 150 } },
    { title: "Email", width: { wpx: 170 } },
    { title: "Phone Number", width: { wpx: 125 } },
    { title: "Membership Plan", width: { wpx: 140 } },
    { title: "Country", width: { wpx: 150 } },
    { title: "Email Verified", width: { wpx: 125 } },
    { title: "Qualified Status", width: { wpx: 125 } },
    { title: "Address Proof", width: { wpx: 125 } },
    { title: "Identity Proof", width: { wpx: 125 } },
    { title: "Due Diligence Status", width: { wpx: 125 } },
    { title: "Industry", width: { wpx: 150 } },
    { title: "Location", width: { wpx: 125 } },
    { title: "Occupation", width: { wpx: 175 } },
    { title: "Profession", width: { wpx: 150 } },
    { title: "Sector", width: { wpx: 150 } },
    { title: "Linkedin Link", width: { wpx: 125 } },
    { title: "Twitter Link", width: { wpx: 125 } },
    { title: "Tokens Per Minute", width: { wpx: 125 } },
    { title: "Total Tokens", width: { wpx: 125 } },
    { title: "Created On", width: { wpx: 200 } },
];

const inquiryListColumns = [
    { title: "#", width: { wpx: 35 } },
    { title: "First Name", width: { wpx: 150 } },
    { title: "Last Name", width: { wpx: 150 } },
    { title: "Email", width: { wpx: 150 } },
    { title: "Phone Number", width: { wpx: 150 } },
    { title: "Message", width: { wpx: 300 } },
    { title: "Ip Address", width: { wpx: 150 } },
    { title: "Created On", width: { wpx: 200 } },
];

const subscribersListColumns = [
    { title: "#", width: { wpx: 35 } },
    { title: "Email", width: { wpx: 150 } },
    { title: "Status", width: { wpx: 150 } },
    { title: "Created On", width: { wpx: 200 } },
];

const sellsideListColumns = [
    { title: "#", width: { wpx: 35 } },
    { title: "User Name", width: { wpx: 150 } },
    { title: "Offering Name", width: { wpx: 150 } },
    { title: "Trading Name", width: { wpx: 150 } },
    { title: "Registration Name", width: { wpx: 150 } },
    { title: "Company Introduction", width: { wpx: 150 } },
    { title: "Juridiction", width: { wpx: 150 } },
    { title: "Trading Address", width: { wpx: 150 } },
    { title: "City", width: { wpx: 150 } },
    { title: "State", width: { wpx: 150 } },
    { title: "Country", width: { wpx: 150 } },
    { title: "Zip Code", width: { wpx: 150 } },
    { title: "Website", width: { wpx: 150 } },
    { title: "Contact Email", width: { wpx: 150 } },
    { title: "Contact First Name", width: { wpx: 150 } },
    { title: "Contact Last Name", width: { wpx: 150 } },
    { title: "Contact Position", width: { wpx: 150 } },
    { title: "Contact Telephone", width: { wpx: 150 } },
    { title: "Contact Title", width: { wpx: 150 } },
    { title: "Referral", width: { wpx: 150 } },
    { title: "Board Requirement", width: { wpx: 150 } },
    { title: "Cash Investment Date", width: { wpx: 150 } },
    { title: "Eligible Tax", width: { wpx: 150 } },
    { title: "Funding Amount", width: { wpx: 150 } },
    { title: "Key Achievements", width: { wpx: 150 } },
    { title: "Pre Money Valuation Expectation", width: { wpx: 150 } },
    { title: "Sales Last Year", width: { wpx: 150 } },
    { title: "Sector", width: { wpx: 150 } },
    { title: "Stage", width: { wpx: 150 } },
    { title: "Created On", width: { wpx: 200 } },
];

const buysideListColumns = [
    { title: "#", width: { wpx: 35 } },
    { title: "User Name", width: { wpx: 150 } },
    { title: "Seeking", width: { wpx: 150 } },
    { title: "Target Business", width: { wpx: 150 } },
    { title: "Target GeoLocation", width: { wpx: 150 } },
    { title: "Target Revenue", width: { wpx: 150 } },
    { title: "Stake Required", width: { wpx: 150 } },
    { title: "About Buy Side", width: { wpx: 150 } },
    { title: "Created On", width: { wpx: 200 } },
];

const wiredTransferTransactionsListColumns = [
    { title: "#", width: { wpx: 35 } },
    { title: "User Name", width: { wpx: 150 } },
    { title: "Email", width: { wpx: 250 } },
    { title: "Plan Name", width: { wpx: 150 } },
    { title: "Transaction Amount", width: { wpx: 150 } },
    { title: "Status", width: { wpx: 150 } },
    { title: "Created On", width: { wpx: 200 } },
];

const paymentTransactionsListColumns = [
    { title: "#", width: { wpx: 35 } },
    { title: "Tranx No", width: { wpx: 150 } },
    { title: "User Name", width: { wpx: 150 } },
    { title: "Email", width: { wpx: 250 } },
    { title: "Details", width: { wpx: 350 }, height: { hpx: 200 } },
    { title: "Status", width: { wpx: 150 } },
    { title: "XMB Tokens", width: { wpx: 150 } },
    { title: "USD Amount", width: { wpx: 150 } },
    { title: "Transaction Date", width: { wpx: 200 } },
];

module.exports = {
    userListColumns,
    inquiryListColumns,
    subscribersListColumns,
    sellsideListColumns,
    buysideListColumns,
    wiredTransferTransactionsListColumns,
    paymentTransactionsListColumns
}