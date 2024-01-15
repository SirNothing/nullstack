describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, { username: 'Testaaja', name: 'Testi', password: 'salasana' })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, { username: 'Feilaaja', name: 'False', password: 'salasana' })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login to app..')
    cy.get('html').should('not.contain', 'Blogs')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('salasana')
      cy.get('#submit-button').click()
      cy.get('html').should('contain', 'logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Testaaja')
      cy.get('#password').type('Wroong')
      cy.get('#submit-button').click()
      cy.get('html').should('contain', 'Incorrect login')
      cy.get('html').should('not.contain', 'Blogs')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
     cy.login( {username: 'Testaaja', password: 'salasana'} ) 
    })

    it('A blog can be created', function() {
      cy.get('#show').click()
      cy.get('input[placeholder*="title"]').type('Tyttelin')
      cy.get('input[placeholder*="author"]').type('Tytti')
      cy.get('input[placeholder*="url"]').type('www.tyttelit.ti')
      cy.get('input[placeholder*="likes"]').type('2')
      cy.get('button[placeholder*="form_submit"]').click()
      cy.contains('Tyttelin')
    })

    describe('blogs added', function() {
      beforeEach(function() {
        cy.addBlog({title: 'Eka otsikko', author: 'ensimmainen', url: 'www.eka.fi', likes: "1"})
        cy.addBlog({title: 'toka otsikko', author: 'toinen', url: 'www.toka.fi', likes: "2"})
        cy.addBlog({title: 'kolmas otsikko', author: 'kolmas', url: 'www.kolmas.fi', likes: "3"})
        cy.visit('')
      })
      
      it('Blog can be liked', function() {
        cy.contains('Eka otsikko').contains('Show more').click()
        cy.contains('Eka otsikko').contains('like it').click()
        cy.contains('Eka otsikko').contains('2')
      })

      it('Blog can be deleted', function() {
        cy.contains('Eka otsikko').contains('Show more').click()
        cy.contains('Eka otsikko').contains('remove').click()
        cy.get('html').should('not.contain', 'Eka otsikko')
      })

      it('Blog can\'t be deleted wrong user', function() {
        cy.contains('Logout').click()
        cy.get('#username').type('Feilaaja')
        cy.get('#password').type('salasana')
        cy.get('#submit-button').click()
        cy.contains('Eka otsikko').contains('Show more').click()
        cy.contains('Eka otsikko').should('not.contain', 'remove')
      })
      
      it('Blogs are sorted max to min', function() {
        cy.contains('Eka otsikko').contains('Show more').click()
        cy.contains('toka otsikko').contains('Show more').click()
        cy.contains('kolmas otsikko').contains('Show more').click()

        cy.get('.hiddenText').eq(0).should('contain', '3')
        cy.get('.hiddenText').eq(1).should('contain', '2')
        cy.get('.hiddenText').eq(2).should('contain', '1')

        cy.contains('Eka otsikko').contains('like it').click()
        cy.contains('www.eka.fi').should('contain', "2")
        cy.contains('Eka otsikko').contains('like it').click()
        cy.contains('www.eka.fi').should('contain', "3")
        cy.contains('Eka otsikko').contains('like it').click()
        cy.contains('www.eka.fi').should('contain', "4")

        cy.get('.hiddenText').eq(0).should('contain', '4')
        cy.get('.hiddenText').eq(1).should('contain', '3')
        cy.get('.hiddenText').eq(2).should('contain', '2')
      })

    })
  })
})
