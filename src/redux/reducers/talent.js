import { GET_TALENT, POST_TALENT, PUT_TALENT } from '../action/talents'

const initialState = {
  talent: null,
  list: [],
  update: '',
}

const talentReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TALENT:
      return {
        ...state,
        talent: action.payload,
      }
    case GET_TALENT:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_TALENT:
      return {
        ...state,
        update: action.payload,
      }
    default:
      return state
  }
}

export default talentReducer
