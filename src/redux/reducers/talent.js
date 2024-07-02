import {
  ADD_MATERIAL,
  DELETE_TALENT,
  GET_TALENT,
  POST_TALENT,
  PUT_TALENT,
  REMOVE_MATERIAL,
} from '../action/talents'

const initialState = {
  talent: null,
  list: [],
  update: '',
}

const talentReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TALENT:
      return {
        ...state,
        talent: action.payload,
      }
    case GET_TALENT:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_TALENT:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_TALENT:
      return {
        ...state,
        talent: state.list.filter((talent) => talent.id !== action.payload),
      }
    case ADD_MATERIAL:
      return {
        ...state,
        talent: action.payload,
      }
    case REMOVE_MATERIAL:
      return {
        ...state,
        talent: {
          ...state.talent,
          necessaryMaterials: state.talent.necessaryMaterials.filter(
            (mater) => mater.id !== action.payload
          ),
        },
      }
    default:
      return state
  }
}

export default talentReducer
