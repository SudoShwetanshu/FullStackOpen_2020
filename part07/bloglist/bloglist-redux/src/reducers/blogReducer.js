import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload.data
    case 'CREATE_BLOG':
      return [...state, action.payload.data]
    case 'REMOVE_BLOG':
      return state.filter(element => element !== action.payload.data)
    case 'LIKE_BLOG':
      return state.map(blog => blog.id !== action.payload.data.id ? blog : action.payload.data)
    case 'COMMENT':
      return null
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogArray = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: {
        data: blogArray
      }
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const blogObj = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      payload: {
        data: blogObj
      }
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      payload: {
        data: blog
      }
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = {
      ...blog, likes: blog.likes + 1
    }

    const likedBlog = await blogService.update(blog.id, newBlog)
    dispatch({
      type: 'LIKE_BLOG',
      payload: {
        data: likedBlog
      }
    })
  }
}

export default reducer
