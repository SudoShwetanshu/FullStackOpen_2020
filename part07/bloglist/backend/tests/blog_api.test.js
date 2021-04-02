const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const api = supertest(app)
jest.setTimeout(50000)
let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password1', 10)

  const user = new User({
    username: 'user',
    name: 'USER1',
    passwordHash
  })
  const savedUser = await user.save()
  const tokenUser = {
    username: savedUser.username,
    id: savedUser._id
  }
  token = jwt.sign(tokenUser, process.env.SECRET)
  const userID = savedUser._id
  const blogs = helper.many.map(
    (blog) => new Blog({ ...blog, user: userID })
  )
  const blogsPromises = blogs.map((blog) => blog.save())
  await Promise.all(blogsPromises)
})

describe('/get endpoint related tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
  })
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body.map(r => r.title)
    expect(blogs).toContain(
      'React patterns'
    )
  })
})

describe('/post endpoint tests', () => {
  test('Valid blog is added', async () => {
    const valid = {
      title: 'valid blog',
      author: 'test author',
      url: 'http://www.meow.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(valid)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body.map(r => r.title)

    expect(response.body).toHaveLength(6 + 1)
    expect(blogs).toContain(
      'valid blog'
    )
  })
  test('blog without title is not added', async () => {
    const invalid = {
      author: 'test invalid_author',
      url: 'http://www.mbeow.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(invalid)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
  test('blog without url is not added', async () => {
    const invalid = {
      author: 'test invalid_url',
      title: 'InvalidNoURL'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(invalid)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
  test('blog without likes defaults to zero', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(helper.noLikes)
      .expect(200)

    const response = await api.get('/api/blogs')
    const blogs = response.body.map(r => r.likes)
    expect(blogs).toContain(0)
  })
  test('HTTP401 when token not provided', async () => {
    const newBlog = new Blog({
      title: 'valid blog',
      author: 'test author',
      url: 'http://www.meow.com'
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
