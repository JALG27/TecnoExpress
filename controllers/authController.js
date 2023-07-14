import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validaciones
    if (!name) {
      return res.send({ error: "Nombre es requerido" });
    }
    if (!email) {
      return res.send({ message: "Email es requerido" });
    }
    if (!password) {
      return res.send({ message: "Contraseña es requerida" });
    }
    if (!phone) {
      return res.send({ message: "Numero de telefono es requerido" });
    }
    if (!address) {
      return res.send({ message: "Direccion es requerida" });
    }
    if (!answer) {
      return res.send({ message: "Respuesta es requerida" });
    }
    //revision de usuario
    const exisitingUser = await userModel.findOne({ email });
    //usuario existente
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Usuario registrado, poravor inicia sesion",
      });
    }
    //registro de usuario
    const hashedPassword = await hashPassword(password);
    //guardado
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "Usuario registrado exitosamente!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error en el registro",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validacion
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email o contraseña Invalido",
      });
    }
    //validar usuario
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email no registrado",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Contraseña invalida",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Sesion iniciada exitosamente",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error en inicio de sesion",
      error,
    });
  }
};

//olvido contraseña controlador

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai es requerido" });
    }
    if (!answer) {
      res.status(400).send({ message: "Respuesta es requerida" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "Nueva contraseña es requerida" });
    }
    //validacion de usuario
    const user = await userModel.findOne({ email, answer });
    //validacion
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email o respuesta incorrecta",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Contraseña actualizada exitosamente!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Algo salio mal",
      error,
    });
  }
};

//controlador test de proteccion rutas
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//actualizar perfil
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //contraseña
    if (password && password.length < 6) {
      return res.json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Peril actualizado exitosamente!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error actualizando perfil",
      error,
    });
  }
};

//ordenes
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las ordenes",
      error,
    });
  }
};
//ordenes
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las ordenes",
      error,
    });
  }
};

//status de ordenes
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al actualizar las ordenes",
      error,
    });
  }
};
