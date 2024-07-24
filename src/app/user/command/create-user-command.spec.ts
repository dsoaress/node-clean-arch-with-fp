import { ResourceAlreadyExists } from "@/app/exception/resource-already-existis";
import { ValidationException } from "@/app/exception/validation-exception";
import { createUserCommand, CreateUserCommand } from "@/app/user/command/create-user-command";
import { newModel } from "@/core/base/new-model";
import { UserDAO } from "@/domain/user/user-dao";
import { userFake } from "@/shared/tests/user-fake";

describe("createUserCommand", () => {
  let command: CreateUserCommand;
  let dao: UserDAO;

  beforeEach(() => {
    dao = { findByEmail: jest.fn(), create: jest.fn() } as unknown as UserDAO;
    command = createUserCommand(dao);
  });

  it("should create a new user", async () => {
    const input = userFake({ id: undefined, createdAt: undefined, updatedAt: undefined });
    await command.execute(input);
    expect(dao.findByEmail).toHaveBeenCalledWith(input.email);
  });

  it("should throw an error if user already exists", async () => {
    const input = userFake({ id: undefined, createdAt: undefined, updatedAt: undefined });
    (dao.findByEmail as jest.Mock).mockResolvedValue(newModel(input));
    await expect(command.execute(input)).rejects.toThrow(ResourceAlreadyExists);
  });

  it("should throw an error if user data is invalid", async () => {
    await expect(command.execute({} as any)).rejects.toThrow(ValidationException);
    await expect(command.execute({ email: "invalid-email" } as any)).rejects.toThrow(
      ValidationException
    );
  });
});
