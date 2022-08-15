import { combineReducers } from 'redux'
import { crypto } from './crypto.reducer';
import { selectedCrypto } from './selected-crypto.reduser'
import { userData } from './user-data.reducer';

const appReducer = combineReducers({
    selectedCrypto,
    homeCrypto: crypto,
    userData
})

export default appReducer;
