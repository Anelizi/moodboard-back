import { v4 as uuid } from 'uuid';
import { db } from "../app.js";
import dayjs from "dayjs"

export async function getProductInformartion(req,res){
    const {product}= req.headers;
    try{
        let prod = await db.collection("products").findOne({name: product})
        res.status(200).send(prod)
    }catch (err){
        console.log(err.message)
    }
}

export async function addPurchase(req,res){
    const {product, price,amount} = req.body;
    let session= res.locals.sessions;

    let now= dayjs()


    const user = await db.collection("users").findOne({
        password: session.userId
    })

    const body = {product: product, price:price, amount: amount, date: now.format("DD/MM") }

    if(user){
        try{
            await db.collection("cart").insertOne(body)
            return res.sendStatus(200)

        } catch(err){
            console.log(err.message)
        }
    }
    else {
        alert("Usuário não cadastrado")
    }

}

