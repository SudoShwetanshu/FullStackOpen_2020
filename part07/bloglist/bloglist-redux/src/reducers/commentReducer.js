import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
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

export default reducer
