import { userFake } from "@/shared/tests/user-fake";
import { newModel } from "./new-model";

describe("newModel", () => {
  it("should return a new model with id, createdAt and updatedAt", () => {
    const input = userFake({ id: undefined, createdAt: undefined, updatedAt: undefined });
    const output = newModel(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      age: input.age,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
