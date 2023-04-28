import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import cartSchema from "../schemas/cart.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { getProductInformartion , postProductInformartion} from "../controllers/product.controllers";
import { addPurchase } from "../controllers/product.controllers";
const productRouter= Router()

//Cadastro dos produtos no banco de dados
productRouter.post(`${process.env.DATABASE_URL}`, postProductInformartion)

//Obtenção de informações do produto para exibição nas páginas de compra
productRouter.get(`${process.env.DATABASE_URL}/produtos`, authValidation, getProductInformartion)

//Realização da compra (seleção do botão "Comprar" na página final de compra)
productRouter.post(`${process.env.DATABASE_URL}/carrinho`, authValidation, validateSchema(cartSchema), addPurchase)