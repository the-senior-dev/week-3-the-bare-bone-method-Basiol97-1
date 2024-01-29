beforeEach(() => {
  cy.visit("http://localhost:3000");

  // home page fixture
  cy.intercept("https://api.themoviedb.org/3/search/movie", {
    fixture: "movie-list-star-wars.json",
  });
});

describe("When the user lands on the home page", () => {
  it("the first 20 movies are displayed", () => {
    cy.get("[data-testid=movie-card-container-11]").should("be.visible");
  });
});
