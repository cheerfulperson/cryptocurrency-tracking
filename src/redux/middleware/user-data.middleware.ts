import { requestApi } from '../../api/api'
import { CryptoAssets } from '../../models/crypto.models'
import {
  EUserDataAtions,
  invalidUserData,
  setUserData,
  UserDataActions,
} from '../actions/user-data.actions'

export const updateUserData = (storeAPI) => (next) => (action: UserDataActions) => {
  if (action.type === EUserDataAtions.LoadUserData) {
    try {
      const { cryptoData } = action.userData
      const cryptoIds = cryptoData.map((value) => value.crypto.id).join(',')
      requestApi
        .get<{ data: CryptoAssets[] }>('assets', {
          params: {
            ids: cryptoIds,
          },
        })
        .then((value) => {
          let newValue = 0
          let newOldValue = 0
          value.data.data.forEach((value) => {
            const oldCryptoDataItem = cryptoData.find((crypto) => crypto.crypto.id === value.id);
            if (oldCryptoDataItem) {
              newOldValue += oldCryptoDataItem.purchasePrice * oldCryptoDataItem.amount
              newValue += Number(value.priceUsd) * oldCryptoDataItem.amount
              oldCryptoDataItem.crypto = value
            }
          })
          storeAPI.dispatch(
            setUserData({
              value: newValue,
              oldValue: newOldValue,
              cryptoData: cryptoData,
            }),
          )
        })
    } catch (error) {
      if (error instanceof Error) {
        storeAPI.dispatch(invalidUserData())
      }
    }
  }
  return next(action)
}

export const addUserDataToStore = () => (next) => (action: UserDataActions) => {
  if (action.type === EUserDataAtions.SetUserData) {
    localStorage.setItem('userData', JSON.stringify(action.userData))
  }
  return next(action)
}
