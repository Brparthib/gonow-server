import { QueryBuilder } from "./../../utils/queryBuilder";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { tourSearchableFields } from "./tour.constant";

// ---------- Tour Type ----------
const createTourType = async (payload: ITourType) => {
  const tourTypeExists = await TourType.findOne({ name: payload.name });
  if (tourTypeExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Tour Type Already Exists!!");
  }

  const newTourType = await TourType.create(payload);

  return newTourType;
};

const getAllTourTypes = async () => {
  const tourTypes = await TourType.find({});
  if (!tourTypes) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Types not found!!");
  }

  const totalTourType = await TourType.countDocuments();

  return {
    data: tourTypes,
    meta: {
      total: totalTourType,
    },
  };
};

const updateTourType = async (id: string, payload: Partial<ITourType>) => {
  const tourTypeExists = await TourType.findById(id);
  if (!tourTypeExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Type not found!!");
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedTourType;
};

const deleteTourType = async (id: string) => {
  const tourTypeExists = await TourType.findById(id);
  if (!tourTypeExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Type not found!!");
  }

  await TourType.findByIdAndDelete(id);

  return null;
};

// ---------- Tour ----------
const createTour = async (payload: ITour) => {
  const tourExists = await Tour.findOne({ title: payload.title });
  if (tourExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A Tour with this title already exists!!"
    );
  }

  const tour = await Tour.create(payload);

  return tour;
};

const getAllTour = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);

  const tours = queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const tourExists = await Tour.findById(id);
  if (!tourExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour not found!!");
  }

  const updatedTour = await Tour.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedTour;
};

const deleteTour = async (id: string) => {
  const tourExists = await Tour.findById(id);
  if (!tourExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour not found!!");
  }

  await Tour.findByIdAndDelete(id);

  return null;
};

export const tourServices = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
};
