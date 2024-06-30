import {
  GET_CONSTELLATION,
  POST_CONSTELLATION,
  PUT_CONSTELLATION,
} from '../action/constellations'

const initialState = {
  constellation: null,
  list: [],
  update: '',
}

const constellationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CONSTELLATION:
      return {
        ...state,
        constellation: action.payload,
      }
    case GET_CONSTELLATION:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_CONSTELLATION:
      return {
        ...state,
        update: action.payload,
      }
    default:
      return state
  }
}

export default constellationReducer
