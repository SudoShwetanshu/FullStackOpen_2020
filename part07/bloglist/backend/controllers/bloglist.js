const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
/* const User = require('../models/user') */
const jwt = require('jsonwebtoken')

/* const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
} */ // using middleware for this

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const body = request.body
  const token = await request.token
  /* const token = getTokenFrom(request) */
  const decodedToken = await jwt.verify(token, process.env.SECRET)

  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user?._id
  })
  const user = request.user

  const saved = await blog.save()
  if (user) {
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
  }

  response.json(saved)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  /* const token = getTokenFrom(request) */
  const token = await request.token
  if (token === null || !token) {
    return response.status(401).json({ error: 'token required!' })
  }
  /* let verifiedToken;
  let decodedToken = await jwt.verify(token, process.env.SECRET, (err) => {
    if(err) {
      response.status(401).json({error: err})
    } else {
       verifiedToken = jwt.verify(token, process.env.SECRET)
    }
  }) */
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (JSON.stringify(blog.user) !== JSON.stringify(user?.id)) {
    return response.status(401).json({ error: 'invalid user' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(blogUpdated)
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const comment = request.body.comment.toString()
  const blog = await Blog.findById(request.params.id)
  blog.comments = await blog.comments.concat(comment)
  const updated = await blog.save()
  response.json(updated)
})

module.exports = blogsRouter
