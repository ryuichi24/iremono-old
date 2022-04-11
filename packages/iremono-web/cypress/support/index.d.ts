/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Sign in
     * @example
     * cy.signin(email, password)
     */
    signin(email: string, password: string): Chainable<any>;
    
    removeAndDelete(itemName: string): Chainable<any>;
  }
}
