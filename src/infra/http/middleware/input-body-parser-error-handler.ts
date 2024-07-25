import { NextFunction, Request, Response } from "express";

export function inputBodyParserErrorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(400).json({
    name: error.name,
    status: 400,
    message: error.message,
  });
}
