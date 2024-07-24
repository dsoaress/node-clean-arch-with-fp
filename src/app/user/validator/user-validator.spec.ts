import { userFake } from "@/shared/tests/user-fake";
import { userValidator } from "./user-validator";

describe("userValidator", () => {
  it.each([
    userFake({ id: undefined }),
    userFake({ id: null as any }),
    userFake({ id: "invalid-id" }),
    userFake({ id: 123 as any }),
    userFake({ name: undefined }),
    userFake({ name: null as any }),
    userFake({ name: 123 as any }),
    userFake({ email: undefined }),
    userFake({ email: null as any }),
    userFake({ email: "invalid-email" }),
    userFake({ email: 123 as any }),
    userFake({ age: undefined }),
    userFake({ age: null as any }),
    userFake({ age: "invalid-age" as any }),
    userFake({ age: 0 }),
    userFake({ age: -1 }),
    userFake({ age: 1.1 }),
    userFake({ age: "1" as any }),
    userFake({ createdAt: undefined }),
    userFake({ createdAt: null as any }),
    userFake({ createdAt: "invalid-date" as any }),
    userFake({ updatedAt: undefined }),
    userFake({ updatedAt: null as any }),
    userFake({ updatedAt: "invalid-date" as any }),
  ])("should return error on invalidate %p", (user) => {
    const result = userValidator.safeParse(user);
    expect(result.success).toBe(false);
  });
});
