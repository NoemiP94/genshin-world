import {
  DELETE_CONSTELLATION,
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
    case DELETE_CONSTELLATION:
      return {
        ...state,
        constellation: state.list.filter(
          (constellation) => constellation.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default constellationReducer
