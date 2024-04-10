/// <reference types="cypress" />

describe('login', () => {
  it('login with right credentials', () => {
    cy.visit('/')
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('Passwort')
    cy.get('button[id="loginButton"]').click()
    cy.get('div[id="organizationCard"]').click()
  })
})

const login = () => {
  cy.visit('/')
  cy.get('input[type="email"]').type('admin@example.com')
  cy.get('input[type="password"]').type('Passwort')
  cy.get('button[id="loginButton"]').click()
  cy.get('div[id="organizationCard"]').click()
}