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

export async function addPurchase(req,res){
    const {productName, name,amount} = req.body;
    let session= res.locals.sessions;

    let now= dayjs()

    const user = await db.collection("users").findOne({
        password: session.userId
    })

    const body = {productName: productName, name: name, amount: amount, date: now.format("DD/MM") }

    if(user){
        try{
            await db.collection("purchases").insertOne(body)
            return res.sendStatus(200)

        } catch(err){
            console.log(err.message)
        }
    }
    else {
        alert("Usuário não cadastrado")
    }

}

