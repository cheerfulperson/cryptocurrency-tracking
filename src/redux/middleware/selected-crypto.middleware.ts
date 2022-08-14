import { requestApi } from '../../api/api'
import {
  ESelectedCryptoAtions,
  invalidLoadSelectedCrypto,
  receiveSelectedCrypto,
  SelectedCryptoActions,
} from '../actions/selected-crypto.actions'

export const fetchSelectedCrypto = (storeAPI) => (next) => (action: SelectedCryptoActions) => {
  if (action.type === ESelectedCryptoAtions.RequestCrypto) {
    try {
      requestApi.get(`assets/${action.cryptoId || ''}`).then((assets) => {
        requestApi
          .get(`assets/${action.cryptoId}/history`, {
            params: {
              interval: 'd1',
            },
          })
          .then((history) => {
            storeAPI.dispatch(receiveSelectedCrypto(assets.data.data, history.data.data))
          })
      })
    } catch (error) {
      if (error instanceof Error) {
        storeAPI.dispatch(invalidLoadSelectedCrypto(error?.message))
      }
    }
  }
  return next(action)
}
