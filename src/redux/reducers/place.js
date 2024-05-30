import { GET_POST_PLACE_IMG, POST_PLACE } from '../action/places'

const initialState = {
  place: null,
  postImage: null,
}

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PLACE:
      return {
        ...state,
        place: action.payload,
      }
    case GET_POST_PLACE_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    default:
      return state
  }
}

export default placeReducer
