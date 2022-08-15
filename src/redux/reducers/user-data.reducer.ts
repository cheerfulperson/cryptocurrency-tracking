import { UsersCrypto } from '../../models/user.model'
import { EUserDataAtions, UserDataActions } from '../actions/user-data.actions'
import { initialState, UserDataState } from '../initialStates'

export function userData(
  state: UserDataState = initialState.userData,
  action: UserDataActions,
): UserDataState {
  const userCryptoItems = state.cryptoData
  const cryptoItem: UsersCrypto | undefined = userCryptoItems.find(
    (value) => value.crypto.id === action.cryptoId,
  )
  const amount: number | null = action.cryptoData?.amount || null
  const purchasePrice: number | null = action.cryptoData?.purchasePrice || null
  const userStateCryptoItems = userCryptoItems.map((value) => {
    if (value.crypto && action.cryptoData && value.crypto.id === action.cryptoData.crypto.id) {
      const newAmount = purchasePrice < 0 ? -amount : amount
      return {
        amount: action.cryptoData.amount + newAmount,
        purchasePrice: value.purchasePrice,
        crypto: value.crypto,
      }
    }
    return value
  })

  switch (action.type) {
    case EUserDataAtions.LoadUserData:
      return {
        ...state,
      }
    case EUserDataAtions.SetUserData:
      return {
        ...state,
        value: action.userData.value,
        oldValue: action.userData.oldValue,
        cryptoData: action.userData.cryptoData,
      }
    case EUserDataAtions.AddCryptoToUserData:
      return {
        ...state,
        value: (state.value || 0) + purchasePrice * amount,
        oldValue: (state.oldValue || 0) + purchasePrice * amount,
        cryptoData: userStateCryptoItems.find((el) => el.crypto.id === action.cryptoData.crypto.id)
          ? userStateCryptoItems
          : [...userStateCryptoItems, action.cryptoData],
      }
    case EUserDataAtions.DeleteCryptoToUserData:
      return {
        ...state,
        value: state.value - cryptoItem.purchasePrice * cryptoItem.amount,
        oldValue: state.oldValue - cryptoItem.purchasePrice * cryptoItem.amount,
        cryptoData: userCryptoItems.filter((value) => value.crypto.id !== action.cryptoId),
      }
    default:
      return state
  }
}
