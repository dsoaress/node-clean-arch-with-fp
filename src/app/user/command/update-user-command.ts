import { ResourceNotFound } from "@/app/exception/resource-not-found";
import { UserDAO } from "@/domain/user/user-dao";
import { UserModel } from "@/domain/user/user-model";
import { ValidationException } from "@/app/exception/validation-exception";

import { userValidator } from "../validator/user-validator";

interface Input {
  id: string;
  data: Partial<UserModel>;
}

export interface UpdateUserCommand {
  execute(input: Input): Promise<void>;
}

export const updateUserCommand = (userDAO: UserDAO): UpdateUserCommand => {
  return {
    async execute(input: Input): Promise<void> {
      const user = await userDAO.findById(input.id);
      if (!user) throw new ResourceNotFound("User does not exist");
      const { id: _id, createdAt: _createdAt, ...rest } = input.data;
      const updatedUser = { ...user, ...rest, updatedAt: new Date() };
      const parsedUpdatedUser = userValidator.safeParse(updatedUser);
      if (!parsedUpdatedUser.success)
        throw new ValidationException(parsedUpdatedUser.error.message);
      await userDAO.update(input.id, parsedUpdatedUser.data);
    },
  };
};
