import '@testing-library/cypress/add-commands';

Cypress.Commands.add('signin', (email, password) => {
  cy.visit('/signin');
  cy.findByRole('textbox', { name: /email/i }).type(email);
  cy.findByLabelText(/password/i).type(password);
  cy.findByRole('button', { name: /sign in/i }).click();
  cy.url().should('contain', '/folders');
});

Cypress.Commands.add('removeAndDelete', (itemName) => {
    // removing
    cy.contains(itemName).rightclick();

    cy.get('.storage-item-context-menu')
      .findByText(/remove/i)
      .click();

    cy.findByRole('button', { name: /remove/i }).click();

    // deleting
    cy.findByTestId('DeleteOutlineOutlinedIcon').click();

    cy.contains(itemName).rightclick();

    cy.get('.trash-item-context-menu')
      .findByText(/delete/i)
      .click();

    cy.findByRole('button', { name: /delete/i }).click();

    cy.contains(itemName).should('not.exist');
});
