import { GET_PIECE, POST_PIECE } from '../action/pieces'

const initialState = {
  piece: null,
  list: [],
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
    default:
      return state
  }
}

export default pieceReducer
