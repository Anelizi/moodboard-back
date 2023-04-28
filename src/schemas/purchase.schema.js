import joi from "joi"

const purchaseSchema= joi.object({
    product: joi.string().required(),
    total: joi.number().required(),
    address: joi.string().min(10).required()
})

export default purchaseSchema;