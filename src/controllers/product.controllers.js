import { v4 as uuid } from 'uuid';
// import { db } from "../app.js";
import {db} from "../database/database.connection.js"
import dayjs from "dayjs"

export async function getProductInformartion(req, res) {
    const { product } = req.headers;
    console.log(product)
    try {
        let prod = await db.collection("products").findOne({ name: product })
        res.status(200).send(prod)
    } catch (err) {
        console.log(err.message)
    } 
}

        export async function addToCart(req, res) {
    const { product, price, amount } = req.body;
    let session = res.locals.session;
    const p= price.replace(',00', '')
    const preco= Number(p)
    console.log(preco)
    console.log(session)

    const identification= uuid()


    const user = await db.collection("users").findOne({
        password: session.userId
    })

    const comprador= session.userId;

    const body = { product: product, price: preco, amount: amount, buyer: comprador, identification: identification }

    if (user) {
        try {
            await db.collection("cart").insertOne(body)
            return res.sendStatus(200)

        } catch (err) {
            console.log(err.message)
        }
    }
    else {
        return alert("Usuário não cadastrado")
    }

}

export async function getCart(req,res){
    let session = res.locals.session;
    const user = await db.collection("users").findOne({
        password: session.userId
    })

    if (user) {
        try {
            let buyerCart= await db.collection("cart").find({buyer: session.userId}).toArray()
            console.log(buyerCart)
            return res.status(200).send(buyerCart)

        } catch (err) {
            console.log(err.message)
        }
    }
    else {
        console.log("Usuário não cadastrado")
    }
}

export async function deleteFromCart(req,res){
    const {identification}= req.headers;
    try{
        await db.collection("cart").deleteOne({identification: identification})
        return res.status(200).send("Compra retirada do carrinho com sucesso")
    } catch(err){
        return res.status(500).send("Deleção não realizada")
    }
}


export async function postPurchase(req,res){
    let session = res.locals.session;
    const {cart, total, address, cardname, digits, cvv, expire}= req.body;
    let now = dayjs()
    try{
        await db.collection("purchases").insertOne({purchase: cart, total: total, address: address, cardname: cardname, cvv: cvv, expire:expire, digits: digits, buyer: session.userId, date: now.format("DD/MM")})
        for(let i=0; i< cart.length; i++){
            await db.collection("cart").deleteOne({identification: cart[i].identification })
        }
        return res.status(200).send("Compra realizada com sucesso!")

    }catch(err){
        console.log(err.message)
    }
}

export async function getPurchase(req, res){
    const { userId } = res.locals.session
    try {
        const purchase = await db
        .collection("purchases")
        .find({userId})
        .sort({date: -1})
        .toArray()
        
        res.send(purchase)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getStorage(req,res){
    try{
        const storage = await db.collection("products").find().toArray()
        const cart= await db.collection("cart").find().toArray()
        console.log(cart)
        return res.status(200).send(storage)
    }catch(err){
        console.log(err.message)
    }
}
