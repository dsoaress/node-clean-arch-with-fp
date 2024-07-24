import { newModel } from "@/core/base/new-model";
import { UserModel } from "@/domain/user/user-model";

export function userFake(overrides: Partial<UserModel> = {}): UserModel {
  return {
    ...newModel({ name: "John Doe", email: "john-doe@test.com", age: 30 }),
    ...overrides,
  };
}
