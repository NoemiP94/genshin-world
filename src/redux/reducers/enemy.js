import {
  GET_ENEMY,
  GET_POST_ENEMY_IMG,
  POST_ENEMY,
  PUT_ENEMY,
} from '../action/enemies'

const initialState = {
  enemy: null,
  list: [],
  postImage: null,
  update: '',
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
    case GET_POST_ENEMY_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    case PUT_ENEMY:
      return {
        ...state,
        update: action.payload,
      }
    default:
      return state
  }
}

export default enemyReducer
