/// <reference types="cypress" />
import { login } from '../handler/loginHandler'

describe('create new user', () => {
  beforeEach(() => {
    login()
  })

  it('create new user', () => {
    cy.wait(1000)

    cy.get('#toggleSidebar').click()
    cy.contains('li', 'Mitglieder').click()

    cy.wait(1000)

    cy.contains('button', 'Hinzufügen').click()
    cy.contains('span', 'Neu erstellen').click()

    cy.fixture('userData.json').then((userData) => {
      cy.get('#firstnameInput').type(userData.firstname)
      cy.get('#lastnameInput').type(userData.lastname)
      cy.get('#birthdateInput').type(userData.birthdate).type('{enter}')
      cy.get('#addressInput').type(userData.address)
      cy.get('#emailInput').type(userData.email)
      cy.get('#phoneInput').type(userData.phone)
    })
  })
})