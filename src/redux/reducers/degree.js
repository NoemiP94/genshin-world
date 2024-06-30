import { POST_DEGREE } from '../action/degrees'

const initialState = {
  degree: null,
}

const degreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DEGREE:
      return {
        ...state,
        degree: action.payload,
      }
    default:
      return state
  }
}

export default degreeReducer
