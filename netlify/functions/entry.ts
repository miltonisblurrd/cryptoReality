import { createRequestHandler } from "@remix-run/netlify";
import type { ServerBuild} from "@remix-run/node";

// Import the build from the build directory
const build = require("../../build/server/index.js") as ServerBuild;

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
}); 