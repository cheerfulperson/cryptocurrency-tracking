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
        value: state.value + purchasePrice * amount,
        oldValue: state.oldValue + purchasePrice * amount,
        cryptoData: [
          ...userCryptoItems.map((value) => {
            if (value.crypto.id === action.cryptoData.crypto.id) {
              const newAmount = purchasePrice < 0 ? -amount : amount
              return {
                amount: action.cryptoData.amount + newAmount,
                purchasePrice: value.purchasePrice,
                crypto: value.crypto,
              }
            }
            return value
          }),
          action.cryptoData,
        ],
      }
    case EUserDataAtions.DeleteCryptoToUserData:
      return {
        ...state,
        oldValue: state.oldValue - cryptoItem.purchasePrice * cryptoItem.amount,
        cryptoData: userCryptoItems.filter((value) => value.crypto.id !== action.cryptoId),
      }
    default:
      return state
  }
}
