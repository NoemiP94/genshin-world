import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers'
import regionReducer from '../reducers/region'
import placeReducer from '../reducers/place'
import materialReducer from '../reducers/material'
import artifactReducer from '../reducers/artifact'
import pieceReducer from '../reducers/piece'
import weaponReducer from '../reducers/weapon'
import domainReducer from '../reducers/domain'
import enemyReducer from '../reducers/enemy'
import characterReducer from '../reducers/character'
import constellationReducer from '../reducers/constellation'

const bigReducer = combineReducers({
  login: loginReducer,
  region: regionReducer,
  place: placeReducer,
  material: materialReducer,
  artifact: artifactReducer,
  piece: pieceReducer,
  weapon: weaponReducer,
  domain: domainReducer,
  enemy: enemyReducer,
  character: characterReducer,
  constellation: constellationReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
