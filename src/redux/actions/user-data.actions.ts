import { UserData, UsersCrypto } from '../../models/user.model'

export enum EUserDataAtions {
  LoadUserData = 'LOAD_USER_DATA',
  SetUserData = 'SET_USER_DATA',
  InvalidUserData = 'INVALID_LOAD_USER_DATA',
  AddCryptoToUserData = 'ADD_CRYPTO_TO_USER_DATA',
  DeleteCryptoToUserData = 'DELETE_CRYPTO_FROM_USER_DATA',
}

export function loadUserData(userData: UserData) {
  return {
    type: EUserDataAtions.LoadUserData,
    userData,
  }
}

export function setUserData(userData: UserData) {
  return {
    type: EUserDataAtions.SetUserData,
    userData,
  }
}

export function invalidUserData() {
  return {
    type: EUserDataAtions.InvalidUserData,
  }
}

export function addCryptoToUserData(cryptoData: UsersCrypto) {
  return {
    type: EUserDataAtions.AddCryptoToUserData,
    cryptoData,
  }
}

export function deleteCryptoFromUserData(cryptoId: string) {
  return {
    type: EUserDataAtions.DeleteCryptoToUserData,
    cryptoId,
  }
}

export type UserDataActions = {
  type: string
  cryptoId?: string
  cryptoData?: UsersCrypto
  userData?: UserData
}
