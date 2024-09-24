const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const fs = require('fs')
      on('after:spec', (spec, results) => {  //check result of spec
        if (results && results.video) {   // result and video both are present then
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed') //check if the state is failed then keep the video
          )
          if (!failures) {
            fs.unlinkSync(results.video) //check if state is not failed then delete the video - unlinksync use to delete video
          }
        }
      })
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
   env:
   {
    devUrl: "https://sb.autostock.co.nz/cars/",
    stageUrl: ""
   }
}); 
