const { defineConfig } = require('cypress')

const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    // Configure your E2E tests here
    baseUrl: "https://parabank.parasoft.com",
    watchForFileChanges: false,
    chromeWebSecurity: false,
    failOnStatusCode: false,
    specPattern: "cypress/e2e/**/*.feature",

    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
      const environmentName = config.env.environmentName || "cypress.env";
      const environmentFilename = `./${environmentName}.json`;
      const configFile = require(environmentFilename);
      if (configFile.env) {
        config.env = {
          ...configFile.env,
        };
      }
      return config;

    },
  }

})