import { Router } from "express";
import {userSignUpPageSchema , userLoginSchema } from "../schemas/auth.schemas.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { postSignUp, postLogin, postLogout } from "../controllers/auth.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const authRouter= Router()

// Cadastro do usuário
authRouter.post("/cadastro",validateSchema(userSignUpPageSchema), postSignUp)

//Login do usuário
authRouter.post("/",validateSchema(userLoginSchema), postLogin)

//Saída do usuário
authRouter.post(`/logout`,authValidation, postLogout)

export default authRouter