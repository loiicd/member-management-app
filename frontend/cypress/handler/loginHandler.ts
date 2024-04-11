export const login = () => {
  cy.visit('/')
  cy.wait(1000)
  cy.get('input[type="email"]').type('admin@example.com')
  cy.get('input[type="password"]').type('Passwort')
  cy.wait(1000)
  cy.get('button[id="loginButton"]').click()
  cy.wait(1000)
  cy.get('div[id="organizationCard"]').click()
}