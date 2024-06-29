import {
  DELETE_CHARACTER,
  GET_CHARACTER,
  GET_POST_CHARACTER_IMG,
  POST_CHARACTER,
  PUT_CHARACTER,
  SINGLE_CHARACTER,
} from '../action/characters'

const initialState = {
  character: null,
  list: [],
  singleCharacter: null,
  postImage: null,
  update: '',
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
    case GET_POST_CHARACTER_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    case PUT_CHARACTER:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_CHARACTER:
      return {
        ...state,
        character: state.list.filter(
          (character) => character.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default characterReducer
