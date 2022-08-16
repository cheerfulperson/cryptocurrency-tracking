import { legacy_createStore as createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { CryptoActions } from './actions/crypto.actions'
import { SelectedCryptoACtions } from './actions/selected-crypto.actions'
import { UserDataActions } from './actions/user-data.actions'
import { AppState } from './initialStates'
import { fetchCrypto } from './middleware/crypto.middleware'
import { fetchSelectedCrypto } from './middleware/selected-crypto.middleware'
import { addUserDataToStore, updateUserData } from './middleware/user-data.middleware'
import appReducer from './reducers/app.reducer'

export type StoreActions = SelectedCryptoACtions | CryptoActions | UserDataActions

export const store: Store<AppState> = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware,
    fetchSelectedCrypto,
    fetchCrypto,
    updateUserData,
    addUserDataToStore,
  ),
)

export type AppDispatch = typeof store.dispatch
