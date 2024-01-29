describe("Movie Search Functionality", () => {
  it("allows a user to search for movies", () => {
    // ARRANGE
    // Mock the API request
    cy.intercept("GET", "https://api.themoviedb.org/3/search/movie*", {
      fixture: "task_2_mock_search_terminator.json",
    }).as("searchMovies");

    cy.visit("http://localhost:3000");

    // Type into the search bar and click the search button
    cy.get("[data-cy=search-input]").type("Terminator");
    cy.get("[data-cy=search-button]").click();

    // Wait for the API call to complete
    cy.wait("@searchMovies");

    // Assert that movies are displayed
    cy.get("[data-cy=movie-list]").should("be.visible");
    cy.get("[data-cy^=movie-card-container]").should("have.length", 20);
  });
});
