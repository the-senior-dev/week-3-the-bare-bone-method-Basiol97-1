describe('Dark Mode Toggle Functionality', () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    describe('When the theme toggle is clicked', () => {
      it('The color of the background switches ', () => {
        // Assuming the default theme is light
  
        // Check for an element that changes with the theme
        cy.get('[data-cy=app-container]').should('have.css', 'background-color', 'rgb(223, 230, 233)')
    
        // Click the toggle to switch to dark mode
        cy.get('[data-cy=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed to dark
        cy.get('[data-cy=app-container]').should('have.css', 'background-color', 'rgb(45, 52, 54)')
  
        // Click again to switch back to light mode
        cy.get('[data-cy=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed back to light
        cy.get('[data-cy=app-container]').should('have.css', 'background-color', 'rgb(223, 230, 233)')
      });

      it('The color of the movie card switches', () => {  
        // Check for an element that changes with the theme
        cy.get("[data-cy^=movie-card-container]").should('have.css', 'background-color', 'rgb(255, 255, 255)');

        // Click the toggle to switch to dark mode
        cy.get('[data-cy=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed to dark
        cy.get("[data-cy^=movie-card-container]").should('have.css', 'background-color', 'rgb(99, 110, 114)');

        // Click again to switch back to light mode
        cy.get('[data-cy=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed back to light
        cy.get("[data-cy^=movie-card-container]").should('have.css', 'background-color', 'rgb(255, 255, 255)');
      });
    })
  
    
  });
  