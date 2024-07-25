import { BaseException } from "@/core/base/base-exception";

import { ResourceAlreadyExists } from "./resource-already-existis";

describe("ResourceAlreadyExists", () => {
  it("should be able to create a new ResourceAlreadyExists", () => {
    const resourceAlreadyExists = new ResourceAlreadyExists("User already exists");

    expect(resourceAlreadyExists).toBeDefined();
    expect(resourceAlreadyExists).toBeInstanceOf(BaseException);
    expect(resourceAlreadyExists.name).toBe("ResourceAlreadyExists");
    expect(resourceAlreadyExists.message).toBe("User already exists");
  });
});
