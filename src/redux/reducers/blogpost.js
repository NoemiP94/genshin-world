import { GET_BLOG, POST_BLOG } from '../action/blogposts'

const initialState = {
  blogpost: null,
  list: [],
}

const blogpostReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_BLOG:
      return {
        ...state,
        blogpost: action.payload,
      }
    case GET_BLOG:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export default blogpostReducer
