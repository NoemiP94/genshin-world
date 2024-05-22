import { GET_REGION, POST_REGION } from '../action/regions'

const initialState = {
  region: null,
  list: [],
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
    default:
      return state
  }
}

export default regionReducer
