import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import cartSchema from "../schemas/cart.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import purchaseSchema from "../schemas/purchase.schema.js";
import { getProductInformartion , getPurchase, postProductsInformartion} from "../controllers/product.controllers.js";
import { addToCart , getCart, postPurchase, deleteFromCart} from "../controllers/product.controllers.js";
const productRouter= Router()

//Cadastro dos produtos no banco de dados (Products' register in the database)
productRouter.post("/", postProductsInformartion)

//Obtenção de informações do produto para exibição nas páginas de compra (Obtaining the product's information  in order to exhibit it in the purchase page)
productRouter.get("/produtos", authValidation, getProductInformartion)

//Adição de desejo de compra ao carrinho (Purchase addition to the buyer's cart)
productRouter.post("/carrinho", authValidation, validateSchema(cartSchema), addToCart)

//Obtenção das informações do carrinho do comprador (Obtaining the buyer's cart information)
productRouter.get("/carrinho", authValidation, getCart)

//Realização da compra
productRouter.post("/compras", authValidation, validateSchema(purchaseSchema), postPurchase )

//Retirada de produto do carrinho
productRouter.delete("/compras",authValidation, deleteFromCart)

//obtenção das informações da complra realizada
productRouter.get("/compras", authValidation, getPurchase)

export default productRouter