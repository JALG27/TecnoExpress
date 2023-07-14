import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Olvidar contraseña || POST
router.post("/forgot-password", forgotPasswordController);

//test rutas
router.get("/test", requireSignIn, isAdmin, testController);

//Ruta protegida de usuario 
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Ruta protegida de admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//actualizar perfil
router.put("/profile", requireSignIn, updateProfileController);

//ordenes
router.get("/orders", requireSignIn, getOrdersController);

//todas las ordenes
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Status de ordenes actualizacion
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
