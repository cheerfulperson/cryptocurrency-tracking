describe('User panel spec', () => {
  function openModal() {
    cy.get('.avatar').click()

    cy.get('.user-panel').parent().should('not.have.class', 'modal-hide')
  }

  it('Should open user panel', () => {
    cy.visit('http://localhost:8080')
    openModal()
  })
  it('Should close user panel', () => {
    cy.visit('http://localhost:8080')
    openModal()

    cy.get('.user-panel__close-btn').click()

    cy.get('.user-panel').parent().should('have.class', 'modal-hide')
  })

  it('Should show user crypto', () => {
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

    openModal()

    cy.get('.user-panel__currency-list').children().should('have.length.above', 0)
  })

  it('Should sell user crypto', () => {
    let timerId: ReturnType<typeof setTimeout>

    cy.visit('http://localhost:8080')
    const cryptoButton = cy.get(
      '.home__currency-table .crypto-row:nth-child(1) .crypto-row__button',
    )

    function startCode() {
      if (cryptoButton) {
        clearTimeout(timerId)
        cryptoButton.click({
          multiple: true,
        })

        cy.get('.modal__container input#input').type('1', { release: false, force: true })
        cy.get('.modal__container button.free-button').click({ multiple: true })

        cy.get('.profile-info__value').should(($span) => {
          const text = $span.text()

          expect(text !== '0').to.eq(true)
        })

        openModal()

        cy.get('.user-panel__currency-list').children().should('not.have.length.above', 2)
        cy.get('.profile-item .ui-button').click({ multiple: true })

        cy.get('.profile-info__value').should(($span) => {
          const text = $span.text()
          expect(+text === 0).to.eq(true)
        })
      }
    }
    timerId = setTimeout(startCode, 1000)
  })
})
