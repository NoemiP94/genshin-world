import {
  DELETE_PIECE,
  GET_PIECE,
  GET_POST_PIECE_IMG,
  POST_PIECE,
  PUT_PIECE,
} from '../action/pieces'

const initialState = {
  piece: null,
  list: [],
  postImage: null,
  update: '',
}

const pieceReducer = (state = initialState, action) => {
  switch (action.payload) {
    case POST_PIECE:
      return {
        ...state,
        piece: action.payload,
      }
    case GET_PIECE:
      return {
        ...state,
        list: action.payload,
      }
    case GET_POST_PIECE_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    case PUT_PIECE:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_PIECE: {
      return {
        ...state,
        list: state.list.filter((piece) => piece.id !== action.payload),
      }
    }
    default:
      return state
  }
}

export default pieceReducer
