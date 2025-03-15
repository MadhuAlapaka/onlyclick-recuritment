describe('Login Test', () => {
  it('should visit the login page and verify title', () => {
    cy.visit('http://localhost:3000/login'); 
    cy.title().should('include', 'Login'); 
  });

  it('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:3000/login'); 

    // Enter login details
    cy.get('input[placeholder="Username"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('password123');


    // Click login button
    cy.get('button').contains('Login').click();

    // Validate successful login
    cy.url().should('include', '/dashboard'); // Update with your redirect URL
    cy.contains('Welcome').should('be.visible'); // Ensure login confirmation appears
  });
});
