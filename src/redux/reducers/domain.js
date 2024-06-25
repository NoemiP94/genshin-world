import { POST_DOMAIN } from '../action/domains'

const initialState = {
  domain: null,
}

const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DOMAIN:
      return {
        ...state,
        domain: action.payload,
      }
    default:
      return state
  }
}

export default domainReducer
