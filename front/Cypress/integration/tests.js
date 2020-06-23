describe("My First Test", () => {
  it("Visits Gardenia", () => {
    cy.visit("http://localhost:8080/");
    cy.contains("login");
    cy.get(".action-email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
  });
});
