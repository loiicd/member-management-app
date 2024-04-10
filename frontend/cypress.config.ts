// module.exports = {
//   projectId: "ba58g5",
//   // ...rest of the Cypress project config
// }

import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "ba58g5",

  e2e: {
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
})
