describe('create new user', () => {
  it('create new user', () => {
    cy.visit('/')
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('Passwort')
    cy.get('button[id="loginButton"]').click()
    cy.get('div[id="organizationCard"]').click()
    cy.get('button[id="toggleSidebar"]').click()
    cy.contains('button', 'Mitglieder').click()
    cy.contains('button', 'Hinzufügen').click()
    cy.contains('span', 'Neu erstellen').click()
  })
})