import { GET_MAINGOAL, POST_MAINGOAL, PUT_MAINGOAL } from '../action/maingoals'

const initialState = {
  mainGoal: null,
  list: [],
  update: '',
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
    case PUT_MAINGOAL:
      return {
        ...state,
        update: action.payload,
      }
    default:
      return state
  }
}

export default mainGoalReducer
