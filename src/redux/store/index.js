import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers'

const bigReducer = combineReducers({
  login: loginReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
