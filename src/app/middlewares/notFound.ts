import httpStatusCode from "http-status-codes";
import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(httpStatusCode.NOT_FOUND).send({
    success: false,
    message: "Route Not Found!!",
  });
};
