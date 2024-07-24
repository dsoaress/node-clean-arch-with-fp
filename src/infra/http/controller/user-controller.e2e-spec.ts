import { PrismaClient } from "@prisma/client";
import { Application } from "express";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import * as request from "supertest";

import { createAppTest } from "@/shared/tests/create-app-test";
import { userFake } from "@/shared/tests/user-fake";
import { newModel } from "@/core/base/new-model";

describe("[2E2] UserController", () => {
  let app: Application;
  let prisma: PrismaClient;
  let databaseContainer: StartedPostgreSqlContainer;

  beforeEach(async () => {
    const { app: expressApp, container, prisma: prismaClient } = await createAppTest();
    app = expressApp;
    prisma = prismaClient;
    databaseContainer = container;
  });

  afterEach(async () => {
    await databaseContainer.stop();
  });

  describe("GET /users", () => {
    it("should return a list of users", async () => {
      const users = [
        userFake({ email: "email1@test.com" }),
        userFake({ email: "email2@test.com" }),
      ];
      await prisma.user.createMany({ data: users });
      const response = await request(app).get("/users").expect(200);
      expect(response.body).toEqual(
        expect.arrayContaining(
          users.map((user) =>
            expect.objectContaining({
              ...user,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            })
          )
        )
      );
    });

    it("should return 500 if an error occurs", async () => {
      await databaseContainer.stop();
      await request(app).get("/users").expect(500);
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user", async () => {
      const user = await prisma.user.create({ data: userFake() });
      const response = await request(app).get(`/users/${user.id}`).expect(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          ...user,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });

    it("should return 404 if user does not exist", async () => {
      await request(app).get("/users/invalid-id").expect(404);
    });
  });

  describe("POST /users", () => {
    it("should create a user", async () => {
      const input = userFake({ id: undefined, createdAt: undefined, updatedAt: undefined });
      await request(app).post("/users").send(input).expect(201);
      const savedUser = await prisma.user.findUnique({ where: { email: input.email } });
      expect(savedUser).toMatchObject({
        ...input,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should return 400 if data is invalid", async () => {
      await request(app).post("/users").send({}).expect(400);
      await request(app).post("/users").send({ email: "email@test.com" }).expect(400);
    });

    it("should return 409 if email is duplicated", async () => {
      const input = userFake({ id: undefined, createdAt: undefined, updatedAt: undefined });
      await prisma.user.create({ data: newModel(input) });
      await request(app).post("/users").send(input).expect(409);
    });
  });

  describe("PATCH /users/:id", () => {
    it("should update a user", async () => {
      const user = await prisma.user.create({ data: userFake() });
      const input = { name: "New Name" };
      await request(app).patch(`/users/${user.id}`).send(input).expect(204);
      const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
      expect(updatedUser).toMatchObject({ ...user, ...input, updatedAt: expect.any(Date) });
    });

    it("should return 400 if data is invalid", async () => {
      const user = await prisma.user.create({ data: userFake() });
      await request(app).patch(`/users/${user.id}`).send({ email: "invalid-email" }).expect(400);
    });

    it("should return 404 if user does not exist", async () => {
      await request(app).patch("/users/invalid-id").expect(404);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      const user = await prisma.user.create({ data: userFake() });
      await request(app).delete(`/users/${user.id}`).expect(204);
      const deletedUser = await prisma.user.findUnique({ where: { id: user.id } });
      expect(deletedUser).toBeNull();
    });

    it("should return 404 if user does not exist", async () => {
      await request(app).delete("/users/invalid-id").expect(404);
    });
  });
});
