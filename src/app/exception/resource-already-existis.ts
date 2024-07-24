import { BaseException } from "@/core/base/base-exception";

export class ResourceAlreadyExists extends BaseException {
  constructor(message: string) {
    super(message);
    this.name = "ResourceAlreadyExists";
  }
}
