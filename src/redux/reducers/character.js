import {
  GET_CHARACTER,
  POST_CHARACTER,
  SINGLE_CHARACTER,
} from '../action/characters'

const initialState = {
  character: null,
  list: [],
  singleCharacter: null,
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
    case SINGLE_CHARACTER:
      return {
        ...state,
        singleCharacter: action.payload,
      }
    default:
      return state
  }
}

export default characterReducer
