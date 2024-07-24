import { BaseDAO } from "@/core/base/base-dao";

import { UserModel } from "./user-model";

export interface UserDAO extends BaseDAO<UserModel> {
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  findAll(): Promise<UserModel[]>;
  create(model: UserModel): Promise<void>;
  update(id: string, model: UserModel): Promise<void>;
  delete(id: string): Promise<void>;
}
