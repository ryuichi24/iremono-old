/// <reference types="cypress" />
// @ts-check
describe('sign in', () => {
  before(function () {
    cy.fixture('sign-in').then(function (fixtureData) {
      this.fixtureData = fixtureData;
    });
  });

  it('should allow the user to sign in', function () {
    cy.visit('/');

    cy.findByRole('textbox', { name: /email/i }).type(this.fixtureData.email);

    cy.findByLabelText(/password/i).type(this.fixtureData.password);

    cy.findByRole('button', { name: /sign in/i }).click();

    cy.findByRole('button', { name: /new/i }).then(($newBtn) => {
      expect($newBtn).to.exist;
    });
  });
});
