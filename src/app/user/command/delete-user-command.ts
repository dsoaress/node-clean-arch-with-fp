import { ResourceNotFound } from "@/app/exception/resource-not-found";
import { UserDAO } from "@/domain/user/user-dao";

interface Input {
  id: string;
}

export interface DeleteUserCommand {
  execute(input: Input): Promise<void>;
}

export const deleteUserCommand = (userDAO: UserDAO): DeleteUserCommand => {
  return {
    async execute(input: Input): Promise<void> {
      const userExists = await userDAO.findById(input.id);
      if (!userExists) throw new ResourceNotFound("User does not exist");
      await userDAO.delete(input.id);
    },
  };
};
