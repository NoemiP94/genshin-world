import {
  ADD_ARTIFACTSET,
  ADD_MATERIAL,
  ADD_WEAPON,
  DELETE_CHARACTER,
  GET_CHARACTER,
  GET_POST_CHARACTER_IMG,
  POST_CHARACTER,
  PUT_CHARACTER,
  REMOVE_ARTIFACTSET,
  REMOVE_MATERIAL,
  REMOVE_WEAPON,
  SINGLE_CHARACTER,
} from '../action/characters'

const initialState = {
  character: null,
  list: [],
  singleCharacter: null,
  postImage: null,
  update: '',
}

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CHARACTER:
      return {
        ...state,
        character: action.payload,
      }
    case GET_CHARACTER:
      return {
        ...state,
        list: action.payload,
      }
    case SINGLE_CHARACTER:
      return {
        ...state,
        singleCharacter: action.payload,
      }
    case GET_POST_CHARACTER_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    case PUT_CHARACTER:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_CHARACTER:
      return {
        ...state,
        list: state.list.filter((character) => character.id !== action.payload),
      }
    case ADD_MATERIAL:
      return {
        ...state,
        character: action.payload,
      }
    case REMOVE_MATERIAL:
      return {
        ...state,
        character: {
          ...state.character,
          ascensionMaterials: state.character.ascensionMaterials.filter(
            (mater) => mater.id !== action.payload
          ),
        },
      }
    case ADD_ARTIFACTSET:
      return {
        ...state,
        character: action.payload,
      }
    case REMOVE_ARTIFACTSET:
      return {
        ...state,
        character: {
          ...state.character.artifactSetList,
          artifactSetList: state.character.artifactSetList.filter(
            (artifact) => artifact.id !== action.payload
          ),
        },
      }
    case ADD_WEAPON:
      return {
        ...state,
        character: action.payload,
      }
    case REMOVE_WEAPON:
      return {
        ...state,
        character: {
          ...state.character.favWeapons,
          favWeapons: state.character.favWeapons.filter(
            (weapon) => weapon.id !== action.payload
          ),
        },
      }
    default:
      return state
  }
}

export default characterReducer
