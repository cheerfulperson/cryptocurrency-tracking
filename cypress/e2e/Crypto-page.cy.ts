describe('Currrency page spec', () => {
  it('Should visit bitcoin page', () => {
    cy.visit('http://localhost:8080/cryptocurrency/bitcoin')
    cy.document().matchImageSnapshot({
      imageConfig: {
        threshold: 0.1,
      },
    })
  })
  it('Should buy bitcoin', () => {
    cy.visit('http://localhost:8080/cryptocurrency/bitcoin')

    cy.get('.cryptocurrency-header button').click()

    cy.get('.modal__container input#input').type('1', { release: false, force: true })
    cy.get('.modal__container button.free-button').click({ multiple: true })

    cy.get('.profile-info__value').should(($span) => {
      const text = $span.text()

      expect(text !== '0').to.eq(true)
    })
  })
  it('Should back to home page', () => {
    cy.visit('http://localhost:8080/cryptocurrency/bitcoin')
    cy.get('.header__button').click()
    cy.location('pathname').should('contain', '/')
  })
})
