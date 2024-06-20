import { POST_ARTIFACT } from '../action/artifacts'

const initialState = {
  artifact: null,
}

const artifactReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ARTIFACT:
      return {
        ...state,
        artifact: action.payload,
      }
    default:
      return state
  }
}

export default artifactReducer
