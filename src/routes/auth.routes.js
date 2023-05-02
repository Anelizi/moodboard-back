import { Router } from "express";
import {userSignUpPageSchema , userLoginSchema } from "../schemas/auth.schemas.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { postSignUp, postLogin, postLogout,getPurchasesMadePage } from "../controllers/auth.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getUserInformation } from "../controllers/product.controllers.js";

const authRouter= Router()

// Cadastro do usuário
authRouter.post("/cadastro",validateSchema(userSignUpPageSchema), postSignUp)

//Login do usuário
authRouter.post("/",validateSchema(userLoginSchema), postLogin)

//Dados do Perfil
authRouter.get("/cadastro",authValidation,  getUserInformation)

//Saída do usuário
authRouter.post(`/logout`,authValidation, postLogout)

export default authRouter