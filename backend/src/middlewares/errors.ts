import createDebug from "debug";
import { Response, Request, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";

export const debug = createDebug("server:middleware");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);
  debug(error.publicMessage);

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};
