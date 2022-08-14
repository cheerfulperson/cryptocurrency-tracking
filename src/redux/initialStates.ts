import { SelecetedCryptoPayload } from '../models/crypto.models'

export interface AppState {
  selectedCrypto: null | SelecetedCryptoPayload
}

export const initialState: AppState = {
  selectedCrypto: {
    error: null,
    receivedAt: null,
    item: null
  },
}
