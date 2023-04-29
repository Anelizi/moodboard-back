import joi from "joi";


//Esquema para validação de cadastro
export const userSignUpPageSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().min(1).required(),
    image: joi.string().required(),
    password: joi.string().min(3).required(),
    //confirmPassword: joi.any().valid(joi.ref('password')).required()
})

//Esquema para validação de login

export const userLoginSchema = joi.object({
    email: joi.string().email().min(1).required(),
    password: joi.string().min(1).required()
})