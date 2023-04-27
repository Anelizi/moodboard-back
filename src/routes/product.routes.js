import { Router } from "express";

const productRouter= Router()

productRouter.get(`${process.env.DATABASE_URL}/produtos`)

productRouter.post(`${process.env.DATABASE_URL}/compras`)