import { POST_MATERIAL } from '../action/materials'

const initialState = {
  material: null,
}

const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_MATERIAL:
      return {
        ...state,
        material: action.payload,
      }
    default:
      return state
  }
}

export default materialReducer
