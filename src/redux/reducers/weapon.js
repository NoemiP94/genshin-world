import { POST_WEAPON } from '../action/weapons'

const initialState = {
  weapon: null,
}

const weaponReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_WEAPON:
      return {
        ...state,
        weapon: action.payload,
      }
    default:
      return state
  }
}

export default weaponReducer
