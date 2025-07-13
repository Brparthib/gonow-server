/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatusCode from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "User data retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const userControllers = {
  createUser,
  getAllUsers
};
