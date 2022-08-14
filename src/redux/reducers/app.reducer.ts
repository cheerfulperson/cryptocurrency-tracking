import { combineReducers } from 'redux'
import { selectedCrypto } from './selected-crypto.reduser'

const appReducer = combineReducers({
    selectedCrypto
})

export default appReducer;
