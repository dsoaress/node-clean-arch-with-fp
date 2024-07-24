import { ResourceAlreadyExists } from "@/app/exception/resource-already-existis";
import { errorHandler } from "./error-handler";
import { Request, Response } from "express";
import { ValidationException } from "@/app/exception/validation-exception";
import { ResourceNotFound } from "@/app/exception/resource-not-found";

describe("errorHandler", () => {
  const json = jest.fn();
  const res = {
    headersSent: false,
    status: jest.fn().mockReturnValue({ json }),
  } as unknown as Response;
  const req = {} as Request;
  const next = jest.fn();

  it("should return 409 status code if error is ResourceAlreadyExists", () => {
    const error = new ResourceAlreadyExists("User already exists");
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(json).toHaveBeenCalledWith({
      name: "ResourceAlreadyExists",
      status: 409,
      message: "User already exists",
    });
  });

  it("should return 400 status code if error is ValidationException", () => {
    const error = new ValidationException("Email is required");
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      name: "ValidationException",
      status: 400,
      message: "Validation Exception",
      details: "Email is required",
    });
  });

  it("should return 400 status code if error is ValidationException with error object", () => {
    const error = new ValidationException(JSON.stringify({ email: "Email is required" }));
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      name: "ValidationException",
      status: 400,
      message: "Validation Exception",
      details: {
        email: "Email is required",
      },
    });
  });

  it("should return 404 status code if error is ResourceNotFound", () => {
    const error = new ResourceNotFound("User not found");
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = { headersSent: false, status } as unknown as Response;
    const req = {} as Request;
    const next = jest.fn();
    errorHandler(error, req, res, next);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      name: "ResourceNotFound",
      status: 404,
      message: "User not found",
    });
  });

  it("should return 500 status code if error is not handled", () => {
    const error = new Error("Internal server error");
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = { headersSent: false, status } as unknown as Response;
    const req = {} as Request;
    const next = jest.fn();
    errorHandler(error, req, res, next);
    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      name: "InternalServerError",
      status: 500,
      message: "Internal server error",
    });
  });
});
