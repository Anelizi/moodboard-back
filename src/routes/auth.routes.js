import { Router } from "express";
import {userSignUpPageSchema , userLoginSchema } from "../schemas/auth.schemas.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { postSignUp, postLogin } from "../controllers/auth.controllers";
const productRouter= Router()

// Cadastro do usuário
productRouter.post(`${process.env.DATABASE_URL}/cadastro`, postSignUp, validateSchema(userSignUpPageSchema))

//Login do usuário
productRouter.post(`${process.env.DATABASE_URL}/login`, postLogin, validateSchema(userLoginSchema))
