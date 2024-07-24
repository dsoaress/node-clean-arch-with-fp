import { BaseException } from "@/core/base/base-exception";

export class ValidationException extends BaseException {
  constructor(details: string) {
    super("Validation Exception", details);
    this.name = "ValidationException";
  }
}
