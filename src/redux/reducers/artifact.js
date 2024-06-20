import {
  DELETE_ARTIFACT,
  GET_ARTIFACT,
  POST_ARTIFACT,
} from '../action/artifacts'

const initialState = {
  artifact: null,
  list: [],
}

const artifactReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ARTIFACT:
      return {
        ...state,
        artifact: action.payload,
      }
    case GET_ARTIFACT:
      return {
        ...state,
        list: action.payload,
      }
    case DELETE_ARTIFACT: {
      return {
        ...state,
        list: state.list.filter((artifact) => artifact.id !== action.payload),
      }
    }
    default:
      return state
  }
}

export default artifactReducer
