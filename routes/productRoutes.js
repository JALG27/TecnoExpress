import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//utas
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//rutas
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//obtener productos
router.get("/get-product", getProductController);

//solo un producto
router.get("/get-product/:slug", getSingleProductController);

//obtener imagen
router.get("/product-photo/:pid", productPhotoController);

//eliminar producto
router.delete("/delete-product/:pid", deleteProductController);

//filtrar producto
router.post("/product-filters", productFiltersController);

//cantidad de producto
router.get("/product-count", productCountController);

//producto por pagina
router.get("/product-list/:page", productListController);

//Buscar producto
router.get("/search/:keyword", searchProductController);

//producto similar
router.get("/related-product/:pid/:cid", realtedProductController);

//categoria y producto
router.get("/product-category/:slug", productCategoryController);

//rutas de pagos
//token
router.get("/braintree/token", braintreeTokenController);

//metodos de pago
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
