import {
  DELETE_PLACE,
  GET_PLACE,
  GET_POST_PLACE_IMG,
  POST_PLACE,
  PUT_PLACE,
} from '../action/places'

const initialState = {
  list: [],
  place: null,
  postImage: null,
  update: '',
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
    case GET_PLACE:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_PLACE:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_PLACE:
      return {
        ...state,
        list: state.list.filter((place) => place.id !== action.payload),
      }
    default:
      return state
  }
}

export default placeReducer
