import { NextFunction, Request, Response } from "express";
import queryStringValidator from "~/middleware/validators/query-string";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let mockNextFunction: NextFunction;

describe("queryStringValidator", () => {
  describe("query param not present", () => {
    beforeEach(() => {
      mockRequest = { query: {} };
      mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      mockNextFunction = jest.fn();
    });

    it("responds with 400", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it("responds with an error message", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.json).toBeCalledWith({ error: "query parameter is required" });
    });

    it("does not call next", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).not.toHaveBeenCalled();
    });
  });

  describe("query param is not string", () => {
    beforeEach(() => {
      mockRequest = { query: { q: ["zapatos"] } };
      mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      mockNextFunction = jest.fn();
    });

    it("responds with 400", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    it("responds with an error message", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.json).toBeCalledWith({ error: "query parameter must be of type string" });
    });

    it("does not call next", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).not.toHaveBeenCalled();
    });
  });

  describe("query param is string", () => {
    beforeEach(() => {
      mockRequest = { query: { q: "zapatos" } };
      mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      mockNextFunction = jest.fn();
    });

    it("calls next", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalled();
    });

    it("does not call res.status nor res.json", () => {
      queryStringValidator(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
