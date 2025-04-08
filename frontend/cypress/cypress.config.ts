import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // 👈 IMPORTANT
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.ts",
  },
});
