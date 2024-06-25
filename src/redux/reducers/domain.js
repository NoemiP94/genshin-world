import {
  DELETE_DOMAIN,
  GET_DOMAIN,
  POST_DOMAIN,
  PUT_DOMAIN,
} from '../action/domains'

const initialState = {
  domain: null,
  list: [],
  update: '',
}

const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DOMAIN:
      return {
        ...state,
        domain: action.payload,
      }
    case GET_DOMAIN:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_DOMAIN:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_DOMAIN: {
      return {
        ...state,
        list: state.list.filter((domain) => domain.id !== action.payload),
      }
    }
    default:
      return state
  }
}

export default domainReducer
