import { randomUUID } from "node:crypto";

import { BaseModel } from "./base-model";

export const newModel = <Model>(input: Model): Model & BaseModel => {
  return {
    ...input,
    id: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
