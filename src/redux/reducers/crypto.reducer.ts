import { CryptoActions, ECryptoAtions } from '../actions/crypto.actions'
import { CryptoState, initialState } from '../initialStates'

export function crypto(
  state: CryptoState = initialState.homeCrypto,
  action: CryptoActions,
): CryptoActions {
  switch (action.type) {
    case ECryptoAtions.RequestAllCrypto:
      return {
        ...state,
        offset: action.offset,
        isLoading: true,
      }
    case ECryptoAtions.InvalidAllLoadCrypto:
      return {
        ...state,
        receivedAt: action.receivedAt,
        isLoading: false,
        error: action.error,
      }
    case ECryptoAtions.ReceiveAllCrypto:
      return {
        ...state,
        receivedAt: action.receivedAt,
        isLoading: false,
        items: action.items,
        pages: action.pages,
      }
    default:
      return { ...state }
  }
}
