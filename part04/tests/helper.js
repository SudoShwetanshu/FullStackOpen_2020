const User = require('../models/user')
const Blog = require('../models/blog')

const many = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const valid = {
  title: 'Valid Blog',
  author: 'valid',
  url:
    'https://www.freecodecamp.org/news/a-beginners-javascript-study-plan-27f1d698ea5e/',
  likes: 0
}

const noLikes = {
  title: 'No Title Blog',
  author: 'No likes',
  url:
    'https://www.relyonhorror.com/articles/17-obscure-horror-games-we-recommend/'
}

const noTitle = {
  author: 'No title',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 0
}

const noUrl = {
  title: 'No url bog',
  author: 'No url',
  likes: 0
}

const validUser = [
  {
    username: 'username1',
    name: 'Username1',
    password: 'password1'
  },
  {
    username: 'username2',
    name: 'Username2',
    password: 'password2'
  },
  {
    username: 'username3',
    name: 'Username3',
    password: 'password3'
  }
]

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  many,
  valid,
  noLikes,
  noTitle,
  noUrl,
  usersInDB,
  blogsInDB,
  validUser
}
