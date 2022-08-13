import { CryptoInfo } from './crypto-info.model'

export interface UserData {
  value: number
  oldValue: number
  currencyCode: string
  cryptoData?: CryptoInfo[]
}
