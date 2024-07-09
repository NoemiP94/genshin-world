import {
  DELETE_USER,
  GET_POST_USER_IMG,
  GET_USERS,
  LOGOUT,
  POST_LOGIN,
  REGISTER_USER,
} from '../action'

const initialState = {
  token: '',
  role: '',
  list: [],
  content: null,
  postImage: null,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      }
    case GET_USERS:
      return {
        ...state,
        list: action.payload,
      }
    case REGISTER_USER:
      return {
        ...state,
        content: action.payload,
      }
    case DELETE_USER:
      return {
        ...state,
        list: state.list.filter((user) => user.id !== action.payload),
      }
    case GET_POST_USER_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default loginReducer
