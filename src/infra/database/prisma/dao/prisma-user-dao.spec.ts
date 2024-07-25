import { UserDAO } from "@/domain/user/user-dao";
import { PrismaClient } from "@prisma/client";
import { prismaUserDAO } from "./prisma-user-dao";
import { userFake } from "@/shared/tests/user-fake";

describe("prismaUserDAO", () => {
  let dao: UserDAO;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    } as unknown as PrismaClient;
    dao = prismaUserDAO(prisma);
  });

  it("should find a user by id", async () => {
    const input = userFake();
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(input);
    const output = await dao.findById(input.id);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: input.id } });
    expect(output).toEqual(input);
  });

  it("should return null if user does not exist", async () => {
    const id = "invalid-id";
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const output = await dao.findById(id);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    expect(output).toBeNull();
  });

  it("should find a user by email", async () => {
    const input = userFake();
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(input);
    const output = await dao.findByEmail(input.email);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: input.email } });
    expect(output).toEqual(input);
  });

  it("should return null if user does not exist", async () => {
    const email = "invalid-email";
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const output = await dao.findByEmail(email);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(output).toBeNull();
  });

  it("should find all users", async () => {
    const users = [userFake(), userFake()];
    (prisma.user.findMany as jest.Mock).mockResolvedValue(users);
    const output = await dao.findAll();
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(output).toEqual(users);
  });

  it("should create a user", async () => {
    const input = userFake();
    await dao.create(input);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: input });
  });

  it("should update a user", async () => {
    const input = userFake();
    await dao.update(input.id, input);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: input.id }, data: input });
  });

  it("should delete a user", async () => {
    const id = "id";
    await dao.delete(id);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
