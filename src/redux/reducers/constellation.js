import {
  DELETE_CONSTELLATION,
  GET_CONSTELLATION,
  GET_POST_CONSTELLATION_IMG,
  POST_CONSTELLATION,
  PUT_CONSTELLATION,
} from '../action/constellations'

const initialState = {
  constellation: null,
  list: [],
  update: '',
  postImage: null,
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
    case GET_POST_CONSTELLATION_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    default:
      return state
  }
}

export default constellationReducer
