import {
  ADD_MATERIAL,
  DELETE_DOMAIN,
  GET_DOMAIN,
  POST_DOMAIN,
  PUT_DOMAIN,
  REMOVE_MATERIAL,
} from '../action/domains'

const initialState = {
  domain: null,
  list: [],
  update: '',
}

const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DOMAIN:
      return {
        ...state,
        domain: action.payload,
      }
    case GET_DOMAIN:
      return {
        ...state,
        list: action.payload,
      }
    case PUT_DOMAIN:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_DOMAIN: {
      return {
        ...state,
        list: state.list.filter((domain) => domain.id !== action.payload),
      }
    }
    case ADD_MATERIAL:
      return {
        ...state,
        domain: action.payload,
      }
    case REMOVE_MATERIAL:
      return {
        ...state,
        domain: {
          ...state.weapon,
          materialList: state.domain.materialList.filter(
            (mater) => mater.id !== action.payload
          ),
        },
      }
    default:
      return state
  }
}

export default domainReducer
