import {
  DELETE_MATERIAL,
  GET_MATERIAL,
  GET_POST_MATERIAL_IMG,
  POST_MATERIAL,
  PUT_MATERIAL,
} from '../action/materials'

const initialState = {
  material: null,
  list: [],
  postImage: null,
  update: '',
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
    case GET_POST_MATERIAL_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    case DELETE_MATERIAL: {
      return {
        ...state,
        list: state.list.filter((material) => material.id !== action.payload),
      }
    }
    case PUT_MATERIAL:
      return {
        ...state,
        update: action.payload,
      }
    default:
      return state
  }
}

export default materialReducer
