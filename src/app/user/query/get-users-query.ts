import { UserDAO } from "@/domain/user/user-dao";
import { UserModel } from "@/domain/user/user-model";

export interface GetUsersQuery {
  execute(): Promise<UserModel[]>;
}

export const getUsersQuery = (userDAO: UserDAO): GetUsersQuery => {
  return {
    async execute(): Promise<UserModel[]> {
      return await userDAO.findAll();
    },
  };
};
