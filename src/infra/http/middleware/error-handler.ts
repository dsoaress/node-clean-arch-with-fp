import { NextFunction, Request, Response } from "express";

import { BaseException } from "@/core/base/base-exception";

function safeParseJSON(data: string): Record<string, unknown> | string {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof BaseException) {
    switch (error.name) {
      case "ResourceAlreadyExists":
        res.status(409).json({ name: error.name, status: 409, message: error.message });
        break;
      case "ValidationException":
        res.status(400).json({
          name: error.name,
          status: 400,
          message: error.message,
          details: safeParseJSON(error.details as string),
        });
        break;
      case "ResourceNotFound":
        res.status(404).json({ name: error.name, status: 404, message: error.message });
        break;
    }
  } else {
    console.error({ name: error.name, message: error.message, stack: error.stack });
    res.status(500).json({
      name: "InternalServerError",
      status: 500,
      message: "Internal server error",
    });
  }
}
