var UserRoleEnum = {
    ADMIN: 'ADMIN',
    ADVISOR: 'ADVISOR',
    BUYER: 'BUYER',
    SELLER: 'SELLER'
};

var UserQualifiedStatusEnum = {
    PENDING: 'PENDING',
    QUALIFIED: 'QUALIFIED',
    REJECTED: 'REJECTED',
    DISQUALIFIED: 'DISQUALIFIED'
};

var subscribeStatusEnum = {
    CONFIRMED: 'CONFIRMED',
    UNCONFIRMED: 'UNCONFIRMED',
    UNSUBSCRIBED: 'UNSUBSCRIBED'
};

var UserKycStatusEnum = {
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    NOTVERIFIED: 'NOTVERIFIED',
};

module.exports = { UserRoleEnum, UserQualifiedStatusEnum, subscribeStatusEnum, UserKycStatusEnum };