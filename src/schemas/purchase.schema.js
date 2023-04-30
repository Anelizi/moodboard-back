import joi from "joi"

const purchaseSchema= joi.object({
    cart: joi.array().min(1).required(),
    total: joi.number().required(),
    address: joi.string().min(10).required(),
    cardname: joi.string().required(),
    digits: joi.string().min(16).required(),
    cvv: joi.number().min(3).required(),
    expire: joi.string().required()
})

export default purchaseSchema;