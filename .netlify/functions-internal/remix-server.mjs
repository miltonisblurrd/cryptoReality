import { createRequestHandler } from "@remix-run/netlify";
import * as serverBuild from "../../build/server/index.js";

export const handler = createRequestHandler({
  build: serverBuild,
  mode: process.env.NODE_ENV,
});

export const config = {
  name: "Remix server handler",
  generator: "@netlify/remix-adapter@2.6.1",
  path: "/*",
  preferStatic: true,
};
    