import { GET_CHARACTER, POST_CHARACTER } from '../action/characters'

const initialState = {
  character: null,
  list: [],
}

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CHARACTER:
      return {
        ...state,
        character: action.payload,
      }
    case GET_CHARACTER:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export default characterReducer
