import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers'
import regionReducer from '../reducers/region'
import placeReducer from '../reducers/place'
import materialReducer from '../reducers/material'
import artifactReducer from '../reducers/artifact'

const bigReducer = combineReducers({
  login: loginReducer,
  region: regionReducer,
  place: placeReducer,
  material: materialReducer,
  artifact: artifactReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
