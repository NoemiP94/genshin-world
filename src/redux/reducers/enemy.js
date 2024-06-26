import { POST_ENEMY } from '../action/enemies'

const initialState = {
  enemy: null,
}

const enemyReducer = (state = initialState, action) => {
  switch (action.payload) {
    case POST_ENEMY:
      return {
        ...state,
        enemy: action.payload,
      }
    default:
      return state
  }
}

export default enemyReducer
