import { POST_GOAL } from '../action/goals'

const initialState = {
  goal: null,
}

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_GOAL:
      return {
        ...state,
        goal: action.payload,
      }
    default:
      return state
  }
}

export default goalReducer
