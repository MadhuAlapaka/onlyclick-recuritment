const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Ensure it matches your backend server
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
