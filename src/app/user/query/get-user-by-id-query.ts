import { ResourceNotFound } from "@/app/exception/resource-not-found";
import { UserDAO } from "@/domain/user/user-dao";
import { UserModel } from "@/domain/user/user-model";

export interface GetUserByIdQuery {
  execute(id: string): Promise<UserModel>;
}

export const getUserByIdQuery = (userDAO: UserDAO): GetUserByIdQuery => {
  return {
    async execute(id: string): Promise<UserModel> {
      const user = await userDAO.findById(id);
      if (!user) throw new ResourceNotFound("User not found");
      return user;
    },
  };
};
