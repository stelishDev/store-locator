describe('App', () => {

  beforeEach(() => {
    cy.server();
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.contains('store-locator app is running!');
  });
});
