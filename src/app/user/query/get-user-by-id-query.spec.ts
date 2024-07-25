import { randomUUID } from "node:crypto";

import { UserDAO } from "@/domain/user/user-dao";
import { ResourceNotFound } from "@/app/exception/resource-not-found";

import { getUserByIdQuery, GetUserByIdQuery } from "./get-user-by-id-query";
import { userFake } from "@/shared/tests/user-fake";

describe("getUserByIdQuery", () => {
  let query: GetUserByIdQuery;
  let dao: UserDAO;

  beforeEach(() => {
    dao = { findById: jest.fn() } as unknown as UserDAO;
    query = getUserByIdQuery(dao);
  });

  it("should get a user by id", async () => {
    const input = userFake();
    (dao.findById as jest.Mock).mockResolvedValue(input);
    const output = await query.execute(input.id);
    expect(dao.findById).toHaveBeenCalledWith(input.id);
    expect(output).toEqual(input);
  });

  it("should throw an error if user does not exist", async () => {
    const id = randomUUID();
    (dao.findById as jest.Mock).mockResolvedValue(null);
    await expect(query.execute(id)).rejects.toThrow(ResourceNotFound);
  });
});
