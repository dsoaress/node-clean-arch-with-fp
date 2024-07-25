import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { setupUserRouter } from "./user-router";
import { errorHandler } from "../middleware/error-handler";

export function setupRouter(): Router {
  const prisma = new PrismaClient();
  const router = Router();
  router.use("/users", setupUserRouter(prisma));
  router.use(errorHandler);
  return router;
}
