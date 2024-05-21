import { POST_REGION } from '../action/regions'

const initialState = {
  region: null,
}

const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REGION:
      return {
        ...state,
        region: action.payload,
      }
    default:
      return state
  }
}

export default regionReducer
