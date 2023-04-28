import Joi from "joi";


//Esquema para validação de cadastro
export const userSignUpPageSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().min(1).required(),
    image: Joi.string().urlSafe().required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required()
})

//Esquema para validação de login

export const userLoginSchema = Joi.object({
    email: Joi.string().email().min(1).required(),
    password: Joi.string().min(1).required()
})