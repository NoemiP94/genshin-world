import { GET_WEAPON, POST_WEAPON } from '../action/weapons'

const initialState = {
  weapon: null,
  list: [],
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
    default:
      return state
  }
}

export default weaponReducer
