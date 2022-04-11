/// <reference types="cypress" />
/// <reference types="../support" />
// @ts-check

describe('sign in', () => {
  before(function () {
    cy.fixture('test-users').then(function (fixtureData) {
      this.fixtureData = fixtureData;
    });
  });

  it('should allow the user to sign in', function () {
    cy.signin(this.fixtureData.testUsers[0].email, this.fixtureData.testUsers[0].password);
  });
});
