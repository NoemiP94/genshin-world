import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers'
import regionReducer from '../reducers/region'
import placeReducer from '../reducers/place'
import materialReducer from '../reducers/material'
import artifactReducer from '../reducers/artifact'
import pieceReducer from '../reducers/piece'
import weaponReducer from '../reducers/weapon'
import domainReducer from '../reducers/domain'

const bigReducer = combineReducers({
  login: loginReducer,
  region: regionReducer,
  place: placeReducer,
  material: materialReducer,
  artifact: artifactReducer,
  piece: pieceReducer,
  weapon: weaponReducer,
  domain: domainReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
