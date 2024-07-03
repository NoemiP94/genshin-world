import { DELETE_GOAL, GET_GOAL, POST_GOAL, PUT_GOAL } from '../action/goals'

const initialState = {
  goal: null,
  list: [],
  update: '',
}

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_GOAL:
      return {
        ...state,
        goal: action.payload,
      }
    case GET_GOAL:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_GOAL:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_GOAL:
      return {
        ...state,
        list: state.list.filter((goal) => goal.id !== action.payload),
      }
    default:
      return state
  }
}

export default goalReducer
