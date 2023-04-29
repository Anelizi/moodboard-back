import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import cartSchema from "../schemas/cart.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import purchaseSchema from "../schemas/purchase.schema.js";
import { getProductInformartion , postProductsInformartion} from "../controllers/product.controllers.js";
import { addToCart , getCart, postPurchase, deleteFromCart} from "../controllers/product.controllers.js";
const productRouter= Router()

//Cadastro dos produtos no banco de dados (Products' register in the database)
productRouter.post(`${process.env.DATABASE_URL}`, postProductsInformartion)

//Obtenção de informações do produto para exibição nas páginas de compra (Obtaining the product's information  in order to exhibit it in the purchase page)
productRouter.get(`${process.env.DATABASE_URL}/produtos`, authValidation, getProductInformartion)

//Adição de desejo de compra ao carrinho (Purchase addition to the buyer's cart)
productRouter.post(`${process.env.DATABASE_URL}/carrinho`, authValidation, validateSchema(cartSchema), addToCart)

//Obtenção das informações do carrinho do comprador (Obtaining the buyer's cart information)
productRouter.get(`${process.env.DATABASE_URL}/carrinho`, authValidation, getCart)

//Realização da compra
productRouter.post(`${process.env.DATABASE_URL}/compras`, authValidation, validateSchema(purchaseSchema), postPurchase )

//Retirada de produto do carrinho
productRouter.delete(`${process.env.DATABASE_URL}/carrinho`,authValidation, deleteFromCart)

export default productRouter