import { BaseException } from "@/core/base/base-exception";

import { ResourceNotFound } from "./resource-not-found";

describe("ResourceNotFound", () => {
  it("should be able to create a new ResourceNotFound", () => {
    const resourceNotFound = new ResourceNotFound("User not found");

    expect(resourceNotFound).toBeDefined();
    expect(resourceNotFound).toBeInstanceOf(BaseException);
    expect(resourceNotFound.name).toBe("ResourceNotFound");
    expect(resourceNotFound.message).toBe("User not found");
  });
});
