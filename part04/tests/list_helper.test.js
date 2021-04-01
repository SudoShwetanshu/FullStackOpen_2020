const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
  })
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.oneBlog)
    expect(result).toBe(listHelper.oneBlog[0].likes)
  })

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of a bigger list', () => {
    const result = listHelper.totalLikes(listHelper.manyBlogs)
    expect(result).toBe(36)
  })
})

describe('most blogs', () => {
  test('author who has the largest amount of blogs', () => {
    const result = listHelper.mostBlogs(listHelper.manyBlogs)
    expect(result).toStrictEqual({
      'author': 'Robert C. Martin',
      'blogs': 3
    })
  })
})

describe('favourite blog', () => {
  test('blog with most likes', () => {
    const result = listHelper.favoriteBlog(listHelper.manyBlogs)
    expect(result).toEqual(listHelper.manyBlogs[2])
    delete result._id
    delete result.__v
    delete result.url
    console.log(JSON.stringify(result))
  })
})

describe('favourite author', () => {
  test('author with most collective likes', () => {
    const result = listHelper.mostLikes(listHelper.manyBlogs)
    delete result._id
    delete result.__v
    delete result.url
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
    console.log(JSON.stringify(result))
  })
})
