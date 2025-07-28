import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tourServices } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";

// ---------- Tour Type ----------
const createTourType = catchAsync(async (req: Request, res: Response) => {
  const tourType = await tourServices.createTourType(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour Type Created Successfully.",
    data: tourType,
  });
});

const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
  const tourTypes = await tourServices.getAllTourTypes();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Types Retrieved Successfully.",
    data: tourTypes.data,
    meta: tourTypes.meta,
  });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const tourType = await tourServices.updateTourType(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Type Updated Successfully.",
    data: tourType,
  });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const tourType = await tourServices.deleteTourType(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Type Deleted Successfully.",
    data: tourType,
  });
});

// ---------- Tour ----------
const createTour = catchAsync(async (req: Request, res: Response) => {
  const tour = await tourServices.createTour(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour Created Successfully.",
    data: tour,
  });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const tours = await tourServices.getAllTour(query as Record<string, string>);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Retrieved Successfully.",
    data: tours.data,
    meta: tours.meta,
  });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const tour = await tourServices.updateTour(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Updated Successfully.",
    data: tour,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const tour = await tourServices.deleteTour(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Deleted Successfully.",
    data: tour,
  });
});

export const tourControllers = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
