describe('create new user', () => {
  it('create new user', () => {
    cy.visit('/')
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('Passwort')
    cy.get('#loginButton').click()

    cy.get('#organizationCard').should('have.text','Beispiel Organisation')
    cy.get('#organizationCard').click()

    cy.get('#toggleSidebar').click()
    cy.contains('button', 'Mitglieder').click()

    cy.contains('button', 'Hinzufügen').click()
    cy.contains('span', 'Neu erstellen').click()
  })
})