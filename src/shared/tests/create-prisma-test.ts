import { execSync } from "node:child_process";

import { PrismaClient } from "@prisma/client";
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";

export async function createPrismaTest(): Promise<{
  prisma: PrismaClient;
  container: StartedPostgreSqlContainer;
}> {
  const container = await new PostgreSqlContainer().start();
  const datasourceUrl = container.getConnectionUri();
  execSync("npx prisma migrate deploy", { env: { ...process.env, DATABASE_URL: datasourceUrl } });
  return {
    prisma: new PrismaClient({ datasourceUrl }),
    container,
  };
}
