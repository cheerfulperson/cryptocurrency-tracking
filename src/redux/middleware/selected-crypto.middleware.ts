import { queryCryptoAsset } from '../../api/api'
import { CryptoAssets } from '../../models/crypto.models'
import {
  ESelectedCryptoAtions,
  invalidLoadSelectedCrypto,
  receiveSelectedCrypto,
  SelectedCryptoACtions,
} from '../actions/selected-crypto.actions'

export const fetchSelectedCrypto = (storeAPI) => (next) => (action: SelectedCryptoACtions) => {
  if (action.type === ESelectedCryptoAtions.RequestCrypto) {
    queryCryptoAsset(action.cryptoId)
      .then((assets) => {
        const cryptoAsset = assets.data.cryptoAsset as CryptoAssets
        storeAPI.dispatch(receiveSelectedCrypto(cryptoAsset, cryptoAsset.history))
      })
      .catch((error) => {
        if (error instanceof Error) {
          storeAPI.dispatch(invalidLoadSelectedCrypto(error?.message))
        }
      })
  }

  return next(action)
}
