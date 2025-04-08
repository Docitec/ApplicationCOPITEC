// frontend/cypress/e2e/connection.cy.ts

describe("Connexion API Backend", () => {
    it("devrait répondre avec un code 200", () => {
      cy.request("http://localhost:8000/health").then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  