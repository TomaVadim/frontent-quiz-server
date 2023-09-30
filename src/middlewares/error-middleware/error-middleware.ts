import { NextFunction, Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpException } from "src/exceptions/http-exception/http-exception";

export const errorMiddleware = (
  error: HttpException,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const status: number = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = getReasonPhrase(status);
    const errorCode = error.errorCode;

    res.status(status).json({ message, errorCode });
  } catch (error) {
    next(error);
  }
};
