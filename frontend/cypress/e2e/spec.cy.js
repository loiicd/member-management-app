import cy from 'cypress'

describe('spec.cy.js', () => {
  it('should visit the app', () => {
    cy.visit('/')
  })
})