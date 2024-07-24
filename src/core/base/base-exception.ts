export abstract class BaseException extends Error {
  readonly details?: string;

  constructor(message: string, details?: string) {
    super(message);
    this.details = details;
  }
}
