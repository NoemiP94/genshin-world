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
import degreeReducer from '../reducers/degree'
import talentReducer from '../reducers/talent'
import mainGoalReducer from '../reducers/maingoal'
import goalReducer from '../reducers/goal'
import blogpostReducer from '../reducers/blogpost'

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
  degree: degreeReducer,
  talent: talentReducer,
  mainGoal: mainGoalReducer,
  goal: goalReducer,
  blogpost: blogpostReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store
