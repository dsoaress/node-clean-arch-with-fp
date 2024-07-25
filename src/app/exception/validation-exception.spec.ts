import { BaseException } from "@/core/base/base-exception";

import { ValidationException } from "./validation-exception";

describe("ValidationException", () => {
  it("should be able to create a new ValidationException", () => {
    const validationException = new ValidationException("Email is required");

    expect(validationException).toBeDefined();
    expect(validationException).toBeInstanceOf(BaseException);
    expect(validationException.name).toBe("ValidationException");
    expect(validationException.message).toBe("Validation Exception");
    expect(validationException.details).toBe("Email is required");
  });
});
