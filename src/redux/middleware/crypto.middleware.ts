import { requestApi } from '../../api/api'
import {
  ECryptoAtions,
  invalidLoadCrypto,
  receiveCrypto,
  CryptoActions,
} from '../actions/crypto.actions'

export const fetchCrypto = (storeAPI) => (next) => (action: CryptoActions) => {
  if (action.type === ECryptoAtions.RequestAllCrypto) {
    try {
      if (!action.pages || action.pages === 0) {
        requestApi.get('assets').then((assets) => {
          const pages = Math.floor(assets.data.data.length / 10) - 1
          storeAPI.dispatch(receiveCrypto(assets.data.data.slice(0, 10), pages))
        })
      } else {
        requestApi
          .get('assets', {
            params: {
              offset: action.offset,
              limit: 10,
            },
          })
          .then((assets) => {
            storeAPI.dispatch(receiveCrypto(assets.data.data, action.pages))
          })
      }
    } catch (error) {
      if (error instanceof Error) {
        storeAPI.dispatch(invalidLoadCrypto(error?.message))
      }
    }
  }
  return next(action)
}
