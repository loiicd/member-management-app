/// <reference types="cypress" />

describe('registrate new user', () => {
  it('throws error by inconsistent passwords', () => {
    cy.wait(1000)
    cy.visit('/register')

    cy.get('#firstnameInput').type('Max')
    cy.get('#lastnameInput').type('Mustermann')
    cy.get('#emailInput').type('max.mustermann@example.com')
    cy.get('#passwordInput').type('Passwort')
    cy.get('#passwordConfirmationInput').type('Passwor')

    cy.get('#registerButton').click()

    cy.contains('Passwörter sind nicht identisch')
  })

  it('throws error by missing names', () => {
    cy.wait(1000)
    cy.visit('/register')

    cy.get('#emailInput').type('max.mustermann@example.com')
    cy.get('#passwordInput').type('Passwort')
    cy.get('#passwordConfirmationInput').type('Passwort')

    cy.get('#registerButton').click()
  })

  it('create new user', () => {
    cy.visit('/register')

    cy.get('#firstnameInput').type('Max')
    cy.get('#lastnameInput').type('Mustermann')
    cy.get('#emailInput').type('max.mustermann@example.com')
    cy.get('#passwordInput').type('Passwort')
    cy.get('#passwordConfirmationInput').type('Passwort')

    cy.get('#registerButton').click()
  })
})