import { Request, Response } from "express";
import { inputBodyParserErrorHandler } from "./input-body-parser-error-handler";

describe("inputBodyParserErrorHandler", () => {
  const json = jest.fn();
  const res = {
    headersSent: false,
    status: jest.fn().mockReturnValue({ json }),
  } as unknown as Response;
  const req = {} as Request;
  const next = jest.fn();

  it("should return 400 status code if error is ResourceAlreadyExists", () => {
    const error = new Error("Unexpected token");
    inputBodyParserErrorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      name: "Error",
      status: 400,
      message: "Unexpected token",
    });
  });
});
