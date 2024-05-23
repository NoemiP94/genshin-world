import { GET_USERS, POST_LOGIN } from '../action'

const initialState = {
  token: '',
  role: '',
  list: [],
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

    default:
      return state
  }
}

export default loginReducer
