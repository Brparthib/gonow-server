import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errorHelpers/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

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

    const isUserExist = await User.findOne({ email: verifiedToken.email });
    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!!");
    }

    if (
      isUserExist.isActive === IsActive.INACTIVE ||
      isUserExist.isActive === IsActive.BLOCKED
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `User is ${isUserExist.isActive}!!`
      );
    }

    if (isUserExist.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is deleted!!");
    }

    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not permitted to access this route!!"
      );
    }

    req.user = verifiedToken;

    next();
  });
