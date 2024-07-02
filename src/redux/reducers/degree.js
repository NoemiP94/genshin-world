import { GET_DEGREE, POST_DEGREE } from '../action/degrees'

const initialState = {
  degree: null,
  list: [],
}

const degreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DEGREE:
      return {
        ...state,
        degree: action.payload,
      }
    case GET_DEGREE:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export default degreeReducer
