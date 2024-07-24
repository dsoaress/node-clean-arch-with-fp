import express from "express";

import { setupRouter } from "./http/router";

export async function server(): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use(setupRouter());
  app.listen(3000, () => console.log("Server is running on port 3000"));
}
