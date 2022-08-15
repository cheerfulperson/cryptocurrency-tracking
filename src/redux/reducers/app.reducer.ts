import { combineReducers } from 'redux'
import { crypto } from './crypto.reducer';
import { selectedCrypto } from './selected-crypto.reduser'

const appReducer = combineReducers({
    selectedCrypto: selectedCrypto,
    homeCrypto: crypto
})

export default appReducer;
