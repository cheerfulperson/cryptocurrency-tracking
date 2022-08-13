
export interface HeaderCryptoInfo {
    cryptoCode: string
    currencySympol: string
    price: number
    profit: number
}

export interface CryptoInfo extends HeaderCryptoInfo {
    name: string
}