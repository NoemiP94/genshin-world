import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers'
import regionReducer from '../reducers/region'
import placeReducer from '../reducers/place'

const bigReducer = combineReducers({
  login: loginReducer,
  region: regionReducer,
  place: placeReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
