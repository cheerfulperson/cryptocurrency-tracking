import { ESelectedCryptoAtions, SelectedCryptoACtions } from '../actions/selected-crypto.actions'
import { initialState, SelectedCryptoState } from '../initialStates'

export function selectedCrypto(
  state: SelectedCryptoState = initialState.selectedCrypto,
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
      return { ...state }
  }
}
