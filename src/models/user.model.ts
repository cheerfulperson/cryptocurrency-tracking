import { CryptoAssets } from './crypto.models'

export interface UsersCrypto {
  amount: number
  purchasePrice: number
  crypto: CryptoAssets
}

export interface UserData {
  value: number
  oldValue: number
  cryptoData?: UsersCrypto[]
}
