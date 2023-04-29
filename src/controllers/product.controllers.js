import { v4 as uuid } from 'uuid';
// import { db } from "../app.js";
import {db} from "../database/database.connection.js"
import dayjs from "dayjs"

export async function postProductsInformartion(req, res) {
    try {
        await db.collection("products").insertMany(
            {
                name: "Poção da Alegria",
                description: "Chega de se sentir pra baixo, com essa poção de duração de 2 dias prepare-se pra encontrar alegria até nas pequenas coisas",
                price: "21,00",
                linkPhoto: "https://i.pinimg.com/564x/29/ba/ca/29bacadbe58a5d8f81aa3613259bba11.jpg"
            },
            {
                name: "Poção do Amor-próprio",
                description: "Está naqueles dias que acha que não merece nada? Se sentindo insuficente? Essa poção é perfeita pra você, com ela você terá a confiança necessária pra enfrentar até o tapete vermelho do oscar sabendo que merece o prêmio que recebeu",
                price: "40,00",
                linkPhoto: "https://i.pinimg.com/564x/97/94/7f/97947fd887f6d6a67519eb5a2a536837.jpg"
            },
            {
                name: "Poção da Luxúria",
                description: "Cansade de ser caste? Precisando desprender-se de certas amarras e dar voz a sua libertinagem? Essa poção garante calar as 'regrinhas' ditadas pela sua cabeça, aguçando seus desejos e despertando sua liberdade e sensualidade",
                price: "25,00",
                linkPhoto: "https://i.pinimg.com/564x/41/91/9b/41919b0f4c4146f618027c2fa30af282.jpg"
            },
            {
                name: "Poção do Sono",
                description: "Dê tchau a insônia, suas noites sem dormir acabaram. Com apenas algumas gotas dessa poção, garanta noites tranquilas. Duração :8h",
                price: "60,00",
                linkPhoto: "https://i.pinimg.com/564x/20/6e/b6/206eb6458fb33af49c969169d21f809a.jpg"
            },
            {
                name: "Poção da memória",
                description: "Cansade de esquecer tudo? Perder compromissos? Seus problemas acabaram, tome essa poção 2 vezes ao dia e tenha memória de elefante.",
                price: "45,00",
                linkPhoto: "https://i.pinimg.com/564x/75/4a/77/754a77bee90413c18f356c5789dc3f47.jpg"
            },
            {
                name: "Poção do medo",
                description: "Cansade de achar filmes de terror sem graça e previsíveis? De se sentir invencível?  Com essa poção tenha medo moderado com duração de até 4h ",
                price: "95,00",
                linkPhoto: "https://i.pinimg.com/564x/55/95/86/55958616c076e2b7856312f0ef530204.jpg"
            },
            {
                name: "Tônico anti-procrastinação",
                description: "Sabe aquele trabalho que você está sempre adiando, a hora de estudar que sempre fica pra depois? Pois bem, deixe tudo isso pra trás com nosso mais novo tônico anti-procrastinação e deixe suas atividades em dia.",
                price: "110,00",
                linkPhoto: "https://i.pinimg.com/564x/28/2f/31/282f31883314381b5847190aaeb6083c.jpg"
            },
            {
                name: "Shot do Esquecimento",
                description: "Precisando esquecer algo no maior estilo 'Brilho Eterno de uma Mente sem Lembranças'? Esse é seu momento, um shot dessa poção e esqueça até seus piores traumas",
                price: "49,00",
                linkPhoto: "https://i.pinimg.com/564x/da/ad/7d/daad7d94282206b3bf7b0798fd5f6cb8.jpg"
            },
            {
                name: "Poção da Raiva",
                description: "Necessita de energia para superar obstáculos ou ameaças? Cansado de ser pacífico e aceitar tudo? Com nossa poção da raiva, desperte essa emoção primitiva e coloque pra fora tudo que precisa. Duração 5h",
                price: "32,00",
                linkPhoto: "https://i.pinimg.com/564x/f9/54/ab/f954ab0d3cf9844d144fa17a4cf082b6.jpg"
            },
            {
                name: "Poção do Amor",
                description: "É uma forma de feitiço de amor, capaz de provocar o gostar de outra pessoa. Duração de 24h",
                price: "75,00",
                linkPhoto: "https://i.pinimg.com/564x/a3/33/9d/a3339d9c724e10c45f5f1eab9d19846a.jpg"
            },
            {
                name: "Shot de Beleza",
                description: "Tem o resultado de um mês de skincare, dois meses de academia e uma tarde no salão com apenas esse shot de beleza. Duração 8h",
                price: "48,00",
                linkPhoto: "https://i.pinimg.com/564x/0f/dc/cf/0fdccf74a757fe37d3acdd791628523b.jpg"
            },
        )
        res.status(200).send("Produtos cadastrados")
    } catch (err) {
        console.log(err.message)
    }
};


export async function getProductInformartion(req, res) {
    const { product } = req.headers;
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

    const identification= uuid()


    const user = await db.collection("users").findOne({
        password: session.userId
    })

    const body = { product: product, price: price, amount: amount, buyer: session.userID, identification: identification }

    if (user) {
        try {
            await db.collection("cart").insertOne(body)
            return res.sendStatus(200)

        } catch (err) {
            console.log(err.message)
        }
    }
    else {
        alert("Usuário não cadastrado")
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
            return res.status(200).send(buyerCart)

        } catch (err) {
            console.log(err.message)
        }
    }
    else {
        alert("Usuário não cadastrado")
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
    const {product, total, address, cardname, digits, cvv, expire}= req.body;
    let now = dayjs()
    try{
        await db.collection("purchases").insertOne({product: product, total: total, address: address, cardname: cardname, cvv: cvv, expire:expire, digits: digits, buyer: session.userId, date: now.format("DD/MM")})
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
