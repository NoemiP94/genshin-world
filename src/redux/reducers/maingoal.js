import {
  DELETE_MAINGOAL,
  GET_MAINGOAL,
  GET_SINGLE_MAINGOAL,
  POST_MAINGOAL,
  PUT_MAINGOAL,
} from '../action/maingoals'

const initialState = {
  mainGoal: null,
  list: [],
  update: '',
  singleMainGoal: null,
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
    case DELETE_MAINGOAL:
      return {
        ...state,
        list: state.list.filter((maingoal) => maingoal.id !== action.payload),
      }
    case GET_SINGLE_MAINGOAL:
      return {
        ...state,
        singleMainGoal: action.payload,
      }
    default:
      return state
  }
}

export default mainGoalReducer
