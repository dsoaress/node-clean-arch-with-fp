import { UserDAO } from "@/domain/user/user-dao";
import { UpdateUserCommand, updateUserCommand } from "./update-user-command";
import { ResourceNotFound } from "@/app/exception/resource-not-found";
import { ValidationException } from "@/app/exception/validation-exception";
import { userFake } from "@/shared/tests/user-fake";

describe("updateUserCommand", () => {
  let command: UpdateUserCommand;
  let dao: UserDAO;

  beforeEach(() => {
    dao = { findById: jest.fn(), update: jest.fn() } as unknown as UserDAO;
    command = updateUserCommand(dao);
  });

  it("should update a user", async () => {
    const user = userFake();
    (dao.findById as jest.Mock).mockResolvedValue(user);
    const input = { ...user, age: 31 };
    await command.execute({ id: user.id, data: input });
    expect(dao.findById).toHaveBeenCalledWith(user.id);
    expect(dao.update).toHaveBeenCalledWith(user.id, { ...input, updatedAt: expect.any(Date) });
  });

  it("should throw an error if user does not exist", async () => {
    (dao.findById as jest.Mock).mockResolvedValue(null);
    await expect(command.execute({ id: "invalid-id", data: {} as any })).rejects.toThrow(
      ResourceNotFound
    );
  });

  it("should throw an error if user data is invalid", async () => {
    const user = userFake();
    (dao.findById as jest.Mock).mockResolvedValue(user);
    await expect(command.execute({ id: user.id, data: { age: "31" } as any })).rejects.toThrow(
      ValidationException
    );
  });
});
