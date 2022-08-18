export interface CryptoAssets {
  id: string
  rank: number | string
  symbol: string
  name: string
  supply: number | string
  maxSupply: number | string | null
  marketCapUsd: number | string
  volumeUsd24Hr: number | string
  priceUsd: number | string
  changePercent24Hr: number | string
  vwap24Hr: number | string
  history?: CryptoHistory[]
}

export interface CryptoAssetsResponse {
  cryptoAssets: CryptoAssets[] | CryptoAssets | null
}
export interface CryptoAssetResponse {
  cryptoAsset: CryptoAssets | null
}
export interface CryptoHistory {
  priceUsd: string
  time: number | string
}

export interface CryptoPayload {
  receivedAt: number
  item: CryptoAssets[]
}

export interface HeaderCryptoInfo {
  cryptoCode: string
  currencySympol: string
  price: number
  profit: number
}

export interface CryptoInfo extends HeaderCryptoInfo {
  name: string
}
