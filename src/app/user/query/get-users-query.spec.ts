import { UserDAO } from "@/domain/user/user-dao";
import { getUsersQuery, GetUsersQuery } from "./get-users-query";
import { userFake } from "@/shared/tests/user-fake";

describe("getUsersQuery", () => {
  let query: GetUsersQuery;
  let dao: UserDAO;

  beforeEach(() => {
    dao = { findAll: jest.fn() } as unknown as UserDAO;
    query = getUsersQuery(dao);
  });

  it("should get all users", async () => {
    const users = [userFake(), userFake()];
    (dao.findAll as jest.Mock).mockResolvedValue(users);
    const output = await query.execute();
    expect(dao.findAll).toHaveBeenCalled();
    expect(output).toEqual(users);
  });
});
