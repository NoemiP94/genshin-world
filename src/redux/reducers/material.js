import { GET_MATERIAL, POST_MATERIAL } from '../action/materials'

const initialState = {
  material: null,
  list: [],
}

const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_MATERIAL:
      return {
        ...state,
        material: action.payload,
      }
    case GET_MATERIAL:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export default materialReducer
