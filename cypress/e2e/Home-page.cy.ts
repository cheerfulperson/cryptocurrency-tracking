describe('Home page spec', () => {
  it('Should visit home page', () => {
    cy.visit('http://localhost:8080')
    cy.document().matchImageSnapshot({
      imageConfig: {
        threshold: 1,
      },
    })
  })

  it('Go to previos cryptos page', () => {
    cy.visit('http://localhost:8080')

    cy.get('.home__pagination>:nth-child(1)').click({ multiple: true })
  })

  it('Get to next cryptos page', () => {
    cy.visit('http://localhost:8080')

    cy.get('.home__pagination>:nth-child(3)').click({ multiple: true })
  })

  it('Buy coin', () => {
    cy.visit('http://localhost:8080')

    cy.get('.home__currency-table .crypto-row:nth-child(1) .crypto-row__button').click({
      multiple: true,
    })

    cy.get('.modal__container input#input').type('1', { release: false, force: true })
    cy.get('.modal__container button.free-button').click({ multiple: true })

    cy.get('.profile-info__value').should(($span) => {
      const text = $span.text()

      expect(text !== '0').to.eq(true)
    })
  })

  it('Go to coin page', () => {
    cy.visit('http://localhost:8080')

    cy.get('.home__currency-table .crypto-row:nth-child(1)').click({ multiple: true })
  })
})
