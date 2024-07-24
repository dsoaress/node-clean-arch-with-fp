import { BaseModel } from "@/core/base/base-model";

export interface UserModel extends BaseModel {
  name: string;
  email: string;
  age: number;
}
