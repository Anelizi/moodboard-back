import { v4 as uuid } from 'uuid';
import { db } from "../app.js";
import dayjs from "dayjs"

export async function getProductInformartion(req,res){
    try{
        res.locals.name = nome
        let product = await db.collection("products").findOne({name: nome})
        res.status(200).send(product)
    }catch (err){
        console.log(err.message)
    }
}