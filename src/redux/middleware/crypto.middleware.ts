import { queryCryptoAssets } from '../../api/api'
import { CryptoAssets } from '../../models/crypto.models'
import {
  ECryptoAtions,
  invalidLoadCrypto,
  receiveCrypto,
  CryptoActions,
} from '../actions/crypto.actions'

export const fetchCrypto = (storeAPI) => (next) => (action: CryptoActions) => {
  if (action.type === ECryptoAtions.RequestAllCrypto) {
    try {
      const { pages } = storeAPI.getState().homeCrypto
      if (pages === 0) {
        queryCryptoAssets(0, 100, false)
          .then((assets) => {
            const cryptoInfo = assets.data.cryptoAssets as CryptoAssets[];
            const pagesAmount = Math.floor(cryptoInfo.length / 10) - 1
            storeAPI.dispatch(receiveCrypto(cryptoInfo.slice(0, 10), pagesAmount))
          })
      } else {
        queryCryptoAssets(action.offset * 10, 10, false)
          .then((assets) => {
            const cryptoInfo = assets.data.cryptoAssets as CryptoAssets[];
            storeAPI.dispatch(receiveCrypto(cryptoInfo, pages))
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
