import { CryptoAssets, CryptoHistory } from '../models/crypto.models'
import { UserData } from '../models/user.model'

export interface CryptoState {
  items?: CryptoAssets[] | null
  currentItems?: CryptoAssets[] | null
  receivedAt?: number
  isLoading: boolean
  error?: string
  offset?: number
  pages?: number
}

export interface SelectedCryptoState {
  receivedAt?: number | null
  isLoading?: boolean | null
  error?: string | null
  item?: CryptoAssets | null
  history?: CryptoHistory[] | null
}

export type UserDataState = Partial<UserData>

export interface AppState {
  selectedCrypto: null | SelectedCryptoState
  homeCrypto: null | CryptoState
  userData: null | UserDataState
}

export const initialState: AppState = {
  selectedCrypto: {
    error: null,
    receivedAt: null,
    item: null,
    history: null,
    isLoading: false,
  },
  homeCrypto: {
    items: [],
    currentItems: [],
    isLoading: false,
    receivedAt: null,
    error: null,
    offset: 0,
    pages: 0,
  },
  userData: {
    value: 0,
    oldValue: 0,
    cryptoData: []
  }
}
