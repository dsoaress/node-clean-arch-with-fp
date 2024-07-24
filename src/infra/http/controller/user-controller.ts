import { NextFunction, Request, Response } from "express";

import { CreateUserCommand } from "@/app/user/command/create-user-command";
import { UpdateUserCommand } from "@/app/user/command/update-user-command";
import { DeleteUserCommand } from "@/app/user/command/delete-user-command";
import { GetUserByIdQuery } from "@/app/user/query/get-user-by-id-query";
import { GetUsersQuery } from "@/app/user/query/get-users-query";

interface Dependencies {
  getUsersQuery: GetUsersQuery;
  getUserByIdQuery: GetUserByIdQuery;
  createUserCommand: CreateUserCommand;
  updateUserCommand: UpdateUserCommand;
  deleteUserCommand: DeleteUserCommand;
}

export const userController = ({
  getUsersQuery,
  getUserByIdQuery,
  createUserCommand,
  updateUserCommand,
  deleteUserCommand,
}: Dependencies) => {
  return {
    getUsers: async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const users = await getUsersQuery.execute();
        res.json(users);
      } catch (error) {
        next(error);
      }
    },
    getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const user = await getUserByIdQuery.execute(id);
        res.json(user);
      } catch (error) {
        next(error);
      }
    },
    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await createUserCommand.execute(req.body);
        res.status(201).end();
      } catch (error) {
        next(error);
      }
    },
    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        await updateUserCommand.execute({ id, data: req.body });
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    },
    delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        await deleteUserCommand.execute({ id });
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    },
  };
};
