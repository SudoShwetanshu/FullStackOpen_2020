describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Test user1',
      username: 'tuser1',
      password: 'password1'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    const user2 = {
      name: 'Test user2',
      username: 'tuser2',
      password: 'password2'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it( 'Bloglist app is rendered', function () {
    cy.contains('BlogList App')
  })

  it('Login form is shown', function () {
    cy.contains('User Login').click()
    cy.contains('Login to the application')
  })

  describe('Login functionalities', function () {
    it('User can login with correct credentials', function () {
      cy.contains('User Login').click()
      cy.get('#username').type('tuser1')
      cy.get('#password').type('password1')
      cy.get('#login-btn').click()
      cy.contains('is logged in.')
    })

    it('Login fails with incorrect credentials', function () {
      cy.contains('User Login').click()
      cy.get('#username').type('tuser1')
      cy.get('#password').type('passhnhord1')
      cy.get('#login-btn').click()
      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tuser1', password: 'password1' })
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#newblog-title').type('BLOG 1')
      cy.get('#newblog-author').type('AUTHOR 1')
      cy.get('#newblog-url').type('wwww.qqqxxx.com')
      cy.get('#newblog-submit-btn').click()
      cy.contains('New Blog')
      cy.contains('BLOG 1')
    })
    it('Blog can be liked', function () {
      cy.createBlog({ title: 'BLOG 1', author: 'AUTHOR 1', url: 'wwww.qqqxxx.com' })
      cy.contains('BLOG 1')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('LIKES : 1')
    })
    it('Blog can be deleted', function () {
      cy.createBlog({ title: 'BLOG 1', author: 'AUTHOR 1', url: 'wwww.qqqxxx.com' })
      cy.contains('BLOG 1')
      cy.contains('view').click()
      cy.contains('Delete Blog').click()
      cy.contains('BLOG 1').should('not.exist')
    })
    it('blogs are ordered according to likes', function () {
      cy.createBlog({ title: 'BLOG 1', author: 'AUTHOR 1', url: 'wwww.qqqxxx.com' })
      cy.createBlog({ title: 'BLOG 2', author: 'AUTHOR 2', url: 'wwww.qqqxxx33.com' })
      cy.contains('BLOG 1')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.wait(500)
      cy.get('button[class="toggleOpen"]').last().click()
      cy.get('button[class="submitbutton"]').last().then(($btn) => {
        cy.wrap($btn).click()
        cy.wait(500)
        cy.wrap($btn).click()
        cy.wait(500)
        cy.wrap($btn).click()
      })
      cy.get('h3').first().should('contain.text', 'BLOG 2')
      cy.get('h3').last().should('contain.text', 'BLOG 1')
    })
  })
})
