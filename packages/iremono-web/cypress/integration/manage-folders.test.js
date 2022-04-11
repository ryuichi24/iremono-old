/// <reference types="cypress" />
/// <reference types="../support" />

// @ts-check
describe('test manage folder', () => {
  beforeEach(function () {
    cy.fixture('test-users').then(function (fixtureData) {
      cy.signin(fixtureData.testUsers[0].email, fixtureData.testUsers[0].password);
    });

    cy.fixture('test-folders').then(function (fixtureData) {
      this.fixtureData = { ...this.fixtureData, ...fixtureData };
    });

    if (Cypress.$('.folder-item').length > 0) {
      cy.get('.folder-item').each(($item, index) => {
        cy.wrap($item).rightclick();

        cy.get('.storage-item-context-menu')
          .findByText(/remove/i)
          .click();

        cy.findByRole('button', { name: /remove/i }).click();
      });

      cy.findByTestId('DeleteOutlineOutlinedIcon').click();

      cy.get('.folder-trash-item').each(($item, index) => {
        cy.wrap($item).rightclick();

        cy.get('.trash-item-context-menu')
          .findByText(/delete/i)
          .click();

        cy.findByRole('button', { name: /delete/i }).click();
      });

      cy.findByTestId('FileCopyOutlinedIcon').click();
    }
  });

  it('should allow the user to create new folder', function () {
    const TEST_FOLDER_NAME = this.fixtureData.testFolders[0].name;

    cy.findByRole('button', { name: /new/i }).click();

    cy.findByRole('menuitem', { name: /new folder/i }).click();

    cy.findByRole('textbox', { name: /folder name/i })
      .type('{selectall}')
      .type(TEST_FOLDER_NAME);

    cy.findByRole('button', { name: /create/i }).click();

    cy.contains(TEST_FOLDER_NAME).should('exist');
  });

  it('should allow the user to rename folder', function () {
    const TEST_FOLDER_NAME = this.fixtureData.testFolders[1].name;

    // creating folder
    cy.findByRole('button', { name: /new/i }).click();

    cy.findByRole('menuitem', { name: /new folder/i }).click();

    cy.findByRole('textbox', { name: /folder name/i })
      .type('{selectall}')
      .type(TEST_FOLDER_NAME);

    cy.findByRole('button', { name: /create/i }).click();

    // renaming folder
    const NEW_TEST_FOLDER_NAME = `${TEST_FOLDER_NAME} (renamed)`;
    cy.contains(TEST_FOLDER_NAME).rightclick();

    cy.get('.storage-item-context-menu')
      .findByText(/rename/i)
      .click();

    cy.findByRole('textbox', { name: /folder name/i })
      .type('{selectall}')
      .type(NEW_TEST_FOLDER_NAME);

    cy.findByRole('button', { name: /rename/i }).click();

    cy.contains(NEW_TEST_FOLDER_NAME).should('exist');
  });

  it('should allow the user to remove folder', function () {
    const TEST_FOLDER_NAME = this.fixtureData.testFolders[2].name;

    // creating folder
    cy.findByRole('button', { name: /new/i }).click();

    cy.findByRole('menuitem', { name: /new folder/i }).click();

    cy.findByRole('textbox', { name: /folder name/i })
      .type('{selectall}')
      .type(TEST_FOLDER_NAME);

    cy.findByRole('button', { name: /create/i }).click();

    // removing
    cy.contains(TEST_FOLDER_NAME).rightclick();

    cy.get('.storage-item-context-menu')
      .findByText(/remove/i)
      .click();

    cy.findByRole('button', { name: /remove/i }).click();

    cy.contains(TEST_FOLDER_NAME).should('not.exist');
  });

  it('should allow the user to delete folder trash item', function () {
    const TEST_FOLDER_NAME = this.fixtureData.testFolders[3].name;

    // creating folder
    cy.findByRole('button', { name: /new/i }).click();

    cy.findByRole('menuitem', { name: /new folder/i }).click();

    cy.findByRole('textbox', { name: /folder name/i })
      .type('{selectall}')
      .type(TEST_FOLDER_NAME);

    cy.findByRole('button', { name: /create/i }).click();

    // removing
    cy.contains(TEST_FOLDER_NAME).rightclick();

    cy.get('.storage-item-context-menu')
      .findByText(/remove/i)
      .click();

    cy.findByRole('button', { name: /remove/i }).click();

    // deleting
    cy.findByTestId('DeleteOutlineOutlinedIcon').click();

    cy.contains(TEST_FOLDER_NAME).rightclick();

    cy.get('.trash-item-context-menu')
      .findByText(/delete/i)
      .click();

    cy.findByRole('button', { name: /delete/i }).click();

    cy.contains(TEST_FOLDER_NAME).should('not.exist');
  });
});
