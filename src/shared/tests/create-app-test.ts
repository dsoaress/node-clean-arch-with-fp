import * as express from "express";
import { PrismaClient } from "@prisma/client";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";

import { setupUserRouter } from "@/infra/http/router/user-router";
import { errorHandler } from "@/infra/http/middleware/error-handler";
import { inputBodyParserErrorHandler } from "@/infra/http/middleware/input-body-parser-error-handler";

import { createPrismaTest } from "./create-prisma-test";

export async function createAppTest(): Promise<{
  app: express.Application;
  container: StartedPostgreSqlContainer;
  prisma: PrismaClient;
}> {
  const { container, prisma } = await createPrismaTest();
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  app.use(inputBodyParserErrorHandler);
  app.use("/users", setupUserRouter(prisma));
  app.use(errorHandler);
  return { app, container, prisma };
}
