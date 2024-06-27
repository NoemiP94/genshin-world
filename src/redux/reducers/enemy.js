import { GET_ENEMY, POST_ENEMY } from '../action/enemies'

const initialState = {
  enemy: null,
  list: [],
}

const enemyReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ENEMY:
      return {
        ...state,
        enemy: action.payload,
      }
    case GET_ENEMY:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export default enemyReducer
