// cypress/e2e/login.cy.ts

describe("Page de connexion", () => {
    const email = "romain.denis@docitec.com";
    const goodPassword = "romain.denis@docitec.com";
    const badPassword = "wrongpass";
  
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("affiche la page de connexion", () => {
      cy.get("input#email").should("exist");
      cy.get("input#password").should("exist");
      cy.get("button[type=submit]").should("contain", "Login");
    });
  
    it("échoue avec un mauvais mot de passe", () => {
      cy.get("input#email").type(email);
      cy.get("input#password").type(badPassword);
      cy.get("button[type=submit]").click();
  
      cy.contains("Identifiants incorrects").should("be.visible");
      cy.url().should("include", "/");
    });
  
    it("réussit avec le bon mot de passe", () => {
      cy.get("input#email").clear().type(email);
      cy.get("input#password").clear().type(goodPassword);
      cy.get("button[type=submit]").click();
  
      cy.url().should("include", "/dashboard");
    });
  });
  