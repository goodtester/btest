describe('2. Login page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should fail with invalid credentials', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.get(':nth-child(1) > .form-group > .form-control').clear();
    cy.get(':nth-child(1) > .form-group > .form-control', {timeout:10000}).type('a');
    cy.get(':nth-child(2) > .form-group > .form-control', {timeout:10000}).type('a');
    cy.wait(3000);
    cy.get('.btn').click();
    cy.get('.error-messages').should('be.not.empty')
    cy.get('.btn').contains('Sign in').should('exist')
  })

  it('should login with valid credentials', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.get(':nth-child(1) > .form-group > .form-control').clear();
    cy.get(':nth-child(1) > .form-group > .form-control', {timeout:10000}).type('riadanush+1@gmail.com');
    cy.get(':nth-child(2) > .form-group > .form-control', {timeout:10000}).type('qa-is-cool');
    cy.wait(3000);
    cy.get('.btn').click();
    cy.get('.btn').contains('Sign in').should('not.exist')
  })
})