import {
  DELETE_ARTIFACT,
  GET_ARTIFACT,
  GET_POST_ARTIFACT_IMG,
  POST_ARTIFACT,
  PUT_ARTIFACT,
} from '../action/artifacts'

const initialState = {
  artifact: null,
  list: [],
  update: '',
  postImage: null,
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
    case PUT_ARTIFACT:
      return {
        ...state,
        update: action.payload,
      }
    case GET_POST_ARTIFACT_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    default:
      return state
  }
}

export default artifactReducer
