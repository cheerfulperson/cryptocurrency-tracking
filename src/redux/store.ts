import { legacy_createStore as createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { SelectedCryptoActions } from './actions/selected-crypto.actions'
import { AppState } from './initialStates'
import { fetchSelectedCrypto } from './middleware/selected-crypto.middleware'
import appReducer from './reducers/app.reducer'

export const store: Store<AppState, SelectedCryptoActions> = createStore(
  appReducer,
  applyMiddleware(thunkMiddleware, fetchSelectedCrypto),
)

export type AppDispatch = typeof store.dispatch
