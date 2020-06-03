describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const testUser = {
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('front page shows login form', function () {
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('success with right data', function () {
      cy.get('input[name = "username"]').type('testuser')
      cy.get('input[name = "password"]').type('testpassword')
      cy.get('#login-button').click()

      cy.get('#logout-button')
    })

    it('fail with wrong data', function () {
      cy.get('input[name = "username"]').type('testuser')
      cy.get('input[name = "password"]').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('button').should('not.have.id', 'logout-button')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({username: 'testuser', password: 'testpassword'})
      cy.contains('new blog').click()
    })

    it('blog can be created', function() {
      cy.get('input#title').type('some title')
      cy.get('input#author').type('some author')
      cy.get('input#url').type('someutl.com')
      cy.get('button[type = "submit"]').click()

      cy.get('.blogList').contains('some title')
    })

    it('user can like a blog', function () {
      cy.createBlog({title: 'sometitle', author: 'someauthor', url: 'someurl.com'})
      cy.get('.blogList').find('button').click()
      cy.get('.like-button').click()
      cy.get('.like-container').contains('likes: 1')
    })

    it('user can delete blog', function () {
      cy.createBlog({title: 'sometitle', author: 'someauthor', url: 'someurl.com'})
      cy.get('.blogList').find('button').click()
      cy.get('.delete-button').click()
      cy.get('.bloglist').should('not.contain', 'sometitle')
      cy.get('.message').contains('deleted')
    })

    it('wrong user can not delete blog', function () {
      cy.createBlog({title: 'sometitle', author: 'someauthor', url: 'someurl.com'})
  
      const testUser = {
        username: 'anotheruser',
        password: 'anotherpassword'
      }
      cy.request('POST', 'http://localhost:3003/api/users', testUser)
      cy.visit('http://localhost:3000')
      cy.login({username: 'anotheruser', password: 'anotherpassword'})
      cy.get('.blogList').find('button').click()
      cy.get('.bloglist').should('not.contain', '.delete-button')

    })

    it('blog sorted according to likes', function () {
      cy.createBlog({title: 'title with 0 likes', author: 'someauthor', url: 'someurl.com'})
      cy.createBlog({title: 'title with 4 likes', author: 'another title', url: 'anotherurl.com', likes: 4})
      cy.createBlog({title: 'title with 1 like', author: 'another title', url: 'anotherurl.com', likes: 1})
      
      cy.get('.blogList').within(() => {
        cy.get('button').contains('view').click()
        cy.get('button').contains('view').click()
        cy.get('button').contains('view').click()
      })

      cy.get('.blogList').within(() => {
        cy.get('.like-container').eq(0).contains('likes: 4')
        cy.get('.like-container').eq(1).contains('likes: 1')
        cy.get('.like-container').eq(2).contains('likes: 0')

        cy.get('.like-button').eq(2).click()
        cy.get('.like-container').eq(2).contains('likes: 1')

        cy.get('.like-button').eq(2).click()
        cy.contains('title with 0 likes').contains('likes: 2')
        cy.get('.like-container').eq(1).contains('likes: 2')
      })
      
    })
  })
})