import { GET_MAINGOAL, POST_MAINGOAL } from '../action/maingoals'

const initialState = {
  mainGoal: null,
  list: [],
}

const mainGoalReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_MAINGOAL:
      return {
        ...state,
        mainGoal: action.payload,
      }
    case GET_MAINGOAL:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export default mainGoalReducer
