import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errorHelpers/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles: string[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(httpStatus.FORBIDDEN, "No Token Received!!");
    }

    const verifiedToken = verifyToken(
      accessToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;

    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not permitted to access this route!!"
      );
    }

    req.user = verifiedToken;

    next();
  });
