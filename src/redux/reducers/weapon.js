import { GET_POST_WEAPON_IMG, GET_WEAPON, POST_WEAPON } from '../action/weapons'

const initialState = {
  weapon: null,
  list: [],
  postImage: null,
}

const weaponReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_WEAPON:
      return {
        ...state,
        weapon: action.payload,
      }
    case GET_WEAPON:
      return {
        ...state,
        list: action.payload,
      }
    case GET_POST_WEAPON_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    default:
      return state
  }
}

export default weaponReducer
