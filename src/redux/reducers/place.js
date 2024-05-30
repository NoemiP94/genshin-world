import { POST_PLACE } from '../action/places'

const initialState = {
  place: null,
}

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PLACE:
      return {
        ...state,
        place: action.payload,
      }
    default:
      return state
  }
}

export default placeReducer
