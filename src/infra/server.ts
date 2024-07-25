import express from "express";

import { setupRouter } from "./http/router";
import { inputBodyParserErrorHandler } from "./http/middleware/input-body-parser-error-handler";

export async function server(): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use(inputBodyParserErrorHandler);
  app.use(setupRouter());
  app.listen(3000, () => console.log("Server is running on port 3000"));
}
