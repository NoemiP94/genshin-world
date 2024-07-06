import { POST_BLOG } from '../action/blogposts'

const initialState = {
  blogpost: null,
}

const blogpostReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_BLOG:
      return {
        ...state,
        blogpost: action.payload,
      }
    default:
      return state
  }
}

export default blogpostReducer
