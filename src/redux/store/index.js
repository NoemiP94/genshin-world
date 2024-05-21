import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers'
import regionReducer from '../reducers/region'

const bigReducer = combineReducers({
  login: loginReducer,
  region: regionReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
