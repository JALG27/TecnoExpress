import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//Rutas
// Crear categoria
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//Actualizar categoria
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Obtener todo categoria
router.get("/get-category", categoryControlller);

//Una categoria
router.get("/single-category/:slug", singleCategoryController);

//Eliminar categoria
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
