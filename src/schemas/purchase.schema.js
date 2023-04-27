import joi from "joi"

//Esquema enviado para a compra do produto- Tiago
const purchaseSchema= joi.object({
    productName: joi.string().required(),
    amount: joi.number().required(),
    name: joi.string().required()
})

export default purchaseSchema;