import { UserDAO } from "@/domain/user/user-dao";
import { DeleteUserCommand, deleteUserCommand } from "./delete-user-command";
import { ResourceNotFound } from "@/app/exception/resource-not-found";
import { userFake } from "@/shared/tests/user-fake";

describe("deleteUserCommand", () => {
  let command: DeleteUserCommand;
  let dao: UserDAO;

  beforeEach(() => {
    dao = { findById: jest.fn(), delete: jest.fn() } as unknown as UserDAO;
    command = deleteUserCommand(dao);
  });

  it("should delete a user", async () => {
    const input = userFake();
    (dao.findById as jest.Mock).mockResolvedValue(input);
    await command.execute({ id: input.id });
    expect(dao.findById).toHaveBeenCalledWith(input.id);
    expect(dao.delete).toHaveBeenCalledWith(input.id);
  });

  it("should throw an error if user does not exist", async () => {
    await expect(command.execute({ id: "invalid-id" })).rejects.toThrow(ResourceNotFound);
  });
});
