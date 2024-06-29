import { POST_CONSTELLATION } from '../action/constellations'

const initialState = {
  constellation: null,
}

const constellationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CONSTELLATION:
      return {
        ...state,
        constellation: action.payload,
      }
    default:
      return state
  }
}

export default constellationReducer
