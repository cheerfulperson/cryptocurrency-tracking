import { ESelectedCryptoAtions, SelectedCryptoACtions } from '../actions/selected-crypto.actions'
import { AppState, initialState } from '../initialStates'

export function selectedCrypto(
  state: AppState = initialState,
  action: SelectedCryptoACtions,
): SelectedCryptoACtions {
  switch (action.type) {
    case ESelectedCryptoAtions.RequestCrypto:
      return {
        ...state,
        isLoading: true,
      }
    case ESelectedCryptoAtions.InvalidLoadCrypto:
      return {
        ...state,
        receivedAt: action.receivedAt,
        isLoading: false,
        error: action.error,
      }
    case ESelectedCryptoAtions.ReceiveCrypto:
      return {
        ...state,
        receivedAt: action.receivedAt,
        isLoading: false,
        item: action.payload,
        history: action.history,
      }
    default:
      return { ...state.selectedCrypto }
  }
}
