import joi from "joi"

//Esquema enviado para adição do produto ao carrinho- Tiago
const cartSchema= joi.object({
    product: joi.string().required(),
    amount: joi.number().required(),
    price: joi.string().required()
})

export default cartSchema;