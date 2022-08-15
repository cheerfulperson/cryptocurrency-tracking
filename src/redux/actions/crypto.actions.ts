import { CryptoAssets } from '../../models/crypto.models'
import { CryptoState } from '../initialStates'

export enum ECryptoAtions {
  RequestAllCrypto = 'REQUEST_REQUESTED_CRYPTOCURRENCY',
  InvalidAllLoadCrypto = 'INVALID_REQUEST_CRYPTOCURRENCY',
  ReceiveAllCrypto = 'RECEIVE_REQUEST_CRYPTOCURRENCY',
}

export function reqestCrypto(offset: number) {
  return {
    type: ECryptoAtions.RequestAllCrypto,
    offset,
  }
}

export function invalidLoadCrypto(error: null | string) {
  return {
    type: ECryptoAtions.InvalidAllLoadCrypto,
    receivedAt: Date.now(),
    error,
  }
}

export function receiveCrypto(items: CryptoAssets[] | null, pages: number) {
  return {
    type: ECryptoAtions.ReceiveAllCrypto,
    receivedAt: Date.now(),
    items,
    pages,
  }
}

export interface CryptoActions extends CryptoState {
  type?: string
}
