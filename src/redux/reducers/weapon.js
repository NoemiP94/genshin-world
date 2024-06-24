import {
  ADD_MATERIAL,
  DELETE_WEAPON,
  GET_POST_WEAPON_IMG,
  GET_WEAPON,
  POST_WEAPON,
  PUT_WEAPON,
  REMOVE_MATERIAL,
} from '../action/weapons'

const initialState = {
  weapon: null,
  list: [],
  postImage: null,
  update: '',
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
    case DELETE_WEAPON: {
      return {
        ...state,
        list: state.list.filter((weapon) => weapon.id !== action.payload),
      }
    }
    case PUT_WEAPON:
      return {
        ...state,
        update: action.payload,
      }
    case ADD_MATERIAL:
      return {
        ...state,
        weapon: action.payload,
      }
    case REMOVE_MATERIAL:
      return {
        ...state,
        weapon: {
          ...state.weapon,
          materials: state.weapon.materials.filter(
            (mater) => mater.id !== action.payload
          ),
        },
      }
    default:
      return state
  }
}

export default weaponReducer
