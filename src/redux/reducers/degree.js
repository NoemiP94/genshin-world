import {
  DELETE_DEGREE,
  GET_DEGREE,
  GET_POST_DEGREE_IMG,
  POST_DEGREE,
  PUT_DEGREE,
} from '../action/degrees'

const initialState = {
  degree: null,
  list: [],
  update: '',
  postImage: null,
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
    case PUT_DEGREE:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_DEGREE:
      return {
        ...state,
        degree: state.list.filter((degree) => degree.id !== action.payload),
      }
    case GET_POST_DEGREE_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    default:
      return state
  }
}

export default degreeReducer
