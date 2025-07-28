import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivision>) => {
  const divisionExists = await Division.findOne({ name: payload.name });
  if (divisionExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Division with this name is already exist!!"
    );
  }

  const division = await Division.create(payload);

  return division;
};

const getAllDivision = async () => {
  const divisions = await Division.find({});
  if (!divisions) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found!!");
  }

  const totalDivision = await Division.countDocuments();

  return {
    data: divisions,
    meta: {
      total: totalDivision,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  if (!division) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found!!");
  }

  return {
    data: division,
  };
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const divisionExists = await Division.findById(id);
  if (!divisionExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Data not found!!");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A division with this name already exist!!"
    );
  }

  const division = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return division;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);

  return null;
};

export const divisionServices = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
