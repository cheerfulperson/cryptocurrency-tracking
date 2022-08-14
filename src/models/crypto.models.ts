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
}

export interface CryptoHistory {
  priceUsd: string
  time: number | string
}

export interface SelecetedCryptoPayload {
  receivedAt?: number | null
  isLoading?: boolean | null
  error?: string | null
  item?: CryptoAssets | null
  history?: CryptoHistory[] | null
}

export interface CryptoPayload {
  receivedAt: number
  item: CryptoAssets[]
}