import z from "zod";
import { Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name is required." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string({ invalid_type_error: "Email is required." })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 character long." })
    .max(100, { message: "Email cannot not exceed 100 characters" }),
  password: z
    .string({ invalid_type_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must be contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  phone: z
    .string({ invalid_type_error: "Phone number must be string." })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address must be string." })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name is required." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .optional(),
  email: z
    .string({ invalid_type_error: "Email is required." })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 character long." })
    .max(100, { message: "Email cannot not exceed 100 characters" })
    .optional(),
  password: z
    .string({ invalid_type_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must be contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .optional(),
  phone: z
    .string({ invalid_type_error: "Phone number must be string." })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address must be string." })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true of false" })
    .optional(),
  isActive: z
    .string({ invalid_type_error: "isActive must be string" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isVerified must be true or false" })
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
});
