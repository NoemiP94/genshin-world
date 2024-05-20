import { POST_LOGIN } from '../action'

const initialState = {
  token: '',
  role: '',
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      }
    default:
      return state
  }
}

export default loginReducer
