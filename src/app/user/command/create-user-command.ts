import { ResourceAlreadyExists } from "@/app/exception/resource-already-existis";
import { ValidationException } from "@/app/exception/validation-exception";
import { newModel } from "@/core/base/new-model";
import { UserDAO } from "@/domain/user/user-dao";
import { UserModel } from "@/domain/user/user-model";

import { userValidator } from "../validator/user-validator";

interface Input extends Omit<UserModel, "id" | "createdAt" | "updatedAt"> {}

export interface CreateUserCommand {
  execute(input: Input): Promise<void>;
}

export const createUserCommand = (userDAO: UserDAO): CreateUserCommand => {
  return {
    async execute(input: Input): Promise<void> {
      if (!input.email) throw new ValidationException("Email is required");
      const userExists = await userDAO.findByEmail(input.email);
      if (userExists) throw new ResourceAlreadyExists("User already exists");
      const user = userValidator.safeParse(newModel(input));
      if (!user.success) throw new ValidationException(user.error.message);
      await userDAO.create(user.data);
    },
  };
};
