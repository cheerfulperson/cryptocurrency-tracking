import { CryptoAssets, CryptoHistory } from '../../models/crypto.models'
import { getToFixedPrice } from '../../utils/cummon'
import { SelectedCryptoState } from '../initialStates'

export enum ESelectedCryptoAtions {
  RequestCrypto = 'REQUEST_REQUESTED_SELECTED_CRYPTO',
  InvalidLoadCrypto = 'INVALID_REQUEST_SELECTED_CRYPTO',
  ReceiveCrypto = 'RECEIVE_REQUEST_SELECTED_CRYPTO',
}

export function reqestSelectedCrypto(cryptoId: string) {
  return {
    type: ESelectedCryptoAtions.RequestCrypto,
    cryptoId,
  }
}

export function invalidLoadSelectedCrypto(error: null | string) {
  return {
    type: ESelectedCryptoAtions.InvalidLoadCrypto,
    receivedAt: Date.now(),
    error,
  }
}

export function receiveSelectedCrypto(payload: CryptoAssets | null, history: CryptoHistory[] | null) {
  const filterdHistory = (history || []).map((value) => {
    const story = Object.assign({}, value);
    const time = new Date(+story.time)
    story.priceUsd = getToFixedPrice(value.priceUsd)
    story.time = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
    return story
  })
  return {
    type: ESelectedCryptoAtions.ReceiveCrypto,
    receivedAt: Date.now(),
    payload,
    history: filterdHistory,
  }
}

export interface SelectedCryptoACtions extends SelectedCryptoState {
  type?: string
  payload?: CryptoAssets | null
  cryptoId?: string | null
}


