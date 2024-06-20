import { GET_PIECE, GET_POST_PIECE_IMG, POST_PIECE } from '../action/pieces'

const initialState = {
  piece: null,
  list: [],
  postImage: null,
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
    default:
      return state
  }
}

export default pieceReducer
