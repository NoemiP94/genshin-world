import {
  DELETE_BLOG,
  GET_BLOG,
  GET_POST_BLOG_IMG,
  POST_BLOG,
  PUT_BLOG,
  SINGLE_BLOG,
} from '../action/blogposts'

const initialState = {
  blogpost: null,
  list: [],
  postImage: null,
  update: '',
  singleBlogpost: null,
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
    case GET_POST_BLOG_IMG:
      return {
        ...state,
        postImage: action.payload,
      }
    case PUT_BLOG:
      return {
        ...state,
        update: action.payload,
      }
    case DELETE_BLOG:
      return {
        ...state,
        list: state.list.filter((blog) => blog.id !== action.payload),
      }
    case SINGLE_BLOG:
      return {
        ...state,
        singleBlogpost: action.payload,
      }
    default:
      return state
  }
}

export default blogpostReducer
