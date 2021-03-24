describe('1. The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/', {failOnStatusCode: false})
  })
})