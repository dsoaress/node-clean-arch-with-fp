import { BaseException } from "@/core/base/base-exception";

export class ResourceNotFound extends BaseException {
  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFound";
  }
}
