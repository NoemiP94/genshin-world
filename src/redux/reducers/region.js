import {
  DELETE_REGION,
  GET_REGION,
  POST_REGION,
  PUT_REGION,
} from '../action/regions'

const initialState = {
  region: null,
  list: [],
  update: '',
}

const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REGION:
      return {
        ...state,
        region: action.payload,
      }
    case GET_REGION:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_REGION:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_REGION:
      return {
        ...state,
        list: state.list.filter((region) => region.id !== action.payload),
      }
    default:
      return state
  }
}

export default regionReducer
