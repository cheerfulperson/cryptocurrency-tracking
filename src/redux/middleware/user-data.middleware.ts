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
          const newCryptoData = cryptoData.slice()
          let newValue = 0
          value.data.data.forEach((value, i) => {
            if (newCryptoData[i]) {
              newValue += Number(value.priceUsd) * newCryptoData[i].amount
              newCryptoData[i].crypto = value
            }
          })
          storeAPI.dispatch(
            setUserData({
              value: newValue,
              oldValue: action.userData.oldValue,
              cryptoData: newCryptoData,
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
