import type { PrismaClient } from "@prisma/client";

import { UserDAO } from "@/domain/user/user-dao";
import { UserModel } from "@/domain/user/user-model";

export const prismaUserDAO = (prisma: PrismaClient): UserDAO => {
  return {
    findById: async (id: string): Promise<UserModel | null> => {
      const result = await prisma.user.findUnique({ where: { id } });
      if (!result) return null;
      return result;
    },
    findByEmail: async (email: string): Promise<UserModel | null> => {
      const result = await prisma.user.findUnique({ where: { email } });
      if (!result) return null;
      return result;
    },
    findAll: async (): Promise<UserModel[]> => {
      return await prisma.user.findMany();
    },
    create: async (model: UserModel): Promise<void> => {
      await prisma.user.create({ data: model });
    },
    update: async (id: string, model: UserModel): Promise<void> => {
      await prisma.user.update({ where: { id }, data: model });
    },
    delete: async (id: string): Promise<void> => {
      await prisma.user.delete({ where: { id } });
    },
  };
};
