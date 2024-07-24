import { PrismaClient } from "@prisma/client";
import { Router } from "express";

import { createUserCommand } from "@/app/user/command/create-user-command";
import { deleteUserCommand } from "@/app/user/command/delete-user-command";
import { updateUserCommand } from "@/app/user/command/update-user-command";
import { prismaUserDAO } from "@/infra/database/prisma/dao/prisma-user-dao";

import { userController } from "../controller/user-controller";
import { getUsersQuery } from "@/app/user/query/get-users-query";
import { getUserByIdQuery } from "@/app/user/query/get-user-by-id-query";

export function setupUserRouter(prisma: PrismaClient) {
  const dao = prismaUserDAO(prisma);
  const commands = {
    getUsersQuery: getUsersQuery(dao),
    getUserByIdQuery: getUserByIdQuery(dao),
    createUserCommand: createUserCommand(dao),
    updateUserCommand: updateUserCommand(dao),
    deleteUserCommand: deleteUserCommand(dao),
  };
  const controller = userController(commands);
  const router: Router = Router();
  router.get("/", controller.getUsers);
  router.get("/:id", controller.getUserById);
  router.post("/", controller.create);
  router.patch("/:id", controller.update);
  router.delete("/:id", controller.delete);
  return router;
}
