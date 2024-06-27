import {
  ADD_MATERIAL,
  DELETE_ENEMY,
  GET_ENEMY,
  GET_POST_ENEMY_IMG,
  POST_ENEMY,
  PUT_ENEMY,
  REMOVE_MATERIAL,
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
    case DELETE_ENEMY: {
      return {
        ...state,
        list: state.list.filter((enemy) => enemy.id !== action.payload),
      }
    }
    case ADD_MATERIAL:
      return {
        ...state,
        enemy: action.payload,
      }
    case REMOVE_MATERIAL:
      return {
        ...state,
        enemy: {
          ...state.weapon,
          rewards: state.enemy.rewards.filter(
            (mater) => mater.id !== action.payload
          ),
        },
      }
    default:
      return state
  }
}

export default enemyReducer
