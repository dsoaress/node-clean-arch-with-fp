import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.*spec\\.ts$",
  transform: {
    ".+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: ["main.ts", "server.ts", "index.ts"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  testTimeout: 60000,
  maxWorkers: 4,
  passWithNoTests: true,
};

export default config;
