var WalletTypes = [
    'BTC',
    'ETH',
    'LTCT',
    'STABLECOIN',
];

var WalletTypeEnum = {
    BTC: 'BTC',
    ETH: 'ETH',
    LTCT: 'LTCT',
    STABLECOIN: 'STABLECOIN',
    WIRE_TRANSFER: 'WIRE_TRANSFER',
}

var WalletTypeNames = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'LTCT': 'Litecoint Testnet',
    'STABLECOIN': 'Stable Coin'
};

var CardPaymentStatusTypes = {
    'APPROVED': 'APPROVED',
    'REJECTED': 'REJECTED',
    'PROCESSING': 'PROCESSING',
    'PENDING': 'PENDING'
};

module.exports = {
    WalletTypes,
    WalletTypeEnum,
    WalletTypeNames,
    CardPaymentStatusTypes
};
