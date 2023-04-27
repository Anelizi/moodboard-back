import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import purchaseSchema from "../schemas/purchase.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { getProductInformartion } from "../controllers/product.controllers";
import { addPurchase } from "../controllers/product.controllers";
const productRouter= Router()

//Obtenção de informações do produto para exibição nas páginas de compra
productRouter.get(`${process.env.DATABASE_URL}/produtos`, authValidation, getProductInformartion)

//Realização da compra (seleção do botão "Comprar" na página final de compra)
productRouter.post(`${process.env.DATABASE_URL}/compras`, authValidation, validateSchema(purchaseSchema), addPurchase)