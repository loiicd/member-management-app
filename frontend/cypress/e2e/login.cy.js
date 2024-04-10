describe('login', () => {
  it('login with right credentials', () => {
    cy.visit('/')
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('Passwort')
    cy.contains('button', 'Anmelden').click()
    cy.contains('h1', 'Beispiel Organisation').click()
  })
})