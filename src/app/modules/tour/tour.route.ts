import { Router } from "express";
import { tourControllers } from "./tour.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createTourZodSchema,
  tourTypeZodSchema,
  updateTourZodSchema,
} from "./tour.validation";

const router = Router();

// ---------- Tour Type ----------
router.get("/tour-type", tourControllers.getAllTourTypes);
router.post(
  "/tour-type/create",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(tourTypeZodSchema),
  tourControllers.createTourType
);
router.patch(
  "/tour-type/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(tourTypeZodSchema),
  tourControllers.updateTourType
);
router.delete(
  "/tour-type/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  tourControllers.deleteTourType
);

// ---------- Tour ----------
router.get("/", tourControllers.getAllTours);
router.post(
  "/create-tour",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(createTourZodSchema),
  tourControllers.createTour
);
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(updateTourZodSchema),
  tourControllers.updateTour
);
router.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  tourControllers.deleteTour
);

export const tourRoutes = router;
