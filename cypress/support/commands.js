// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.visit('/')
  cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
  cy.get(':nth-child(1) > .form-group > .form-control').clear();
  cy.get(':nth-child(1) > .form-group > .form-control', {timeout:10000}).type('riadanush+1@gmail.com');
  cy.get(':nth-child(2) > .form-group > .form-control', {timeout:10000}).type('qa-is-cool');
  cy.wait(1000);
  cy.get('.btn').click();
  cy.get('.btn').contains('Sign in').should('not.exist')
  cy.wait(1000);
});

Cypress.Commands.add('logout', () => {
  cy.get('.navbar .nav-item [href="#/settings"]').click();
  cy.wait(1000);
  cy.get('div.settings-page button.btn.btn-outline-danger').click();
  cy.wait(1000);
  cy.get('.btn').contains('Sign in').should('exist')
});
