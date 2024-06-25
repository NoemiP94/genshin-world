import { GET_DOMAIN, POST_DOMAIN } from '../action/domains'

const initialState = {
  domain: null,
  list: [],
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
    default:
      return state
  }
}

export default domainReducer
