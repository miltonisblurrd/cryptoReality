import { createRequestHandler } from "@remix-run/netlify";

// Import the build from the build directory
const build = require("../../build/server/index.js");

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
}); 