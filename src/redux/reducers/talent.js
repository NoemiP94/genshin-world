import { POST_TALENT } from '../action/talents'

const initialState = {
  talent: null,
}

const talentReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TALENT:
      return {
        ...state,
        talent: action.payload,
      }
    default:
      return state
  }
}

export default talentReducer
