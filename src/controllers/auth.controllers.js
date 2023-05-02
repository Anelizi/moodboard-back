// import { db } from "../app.js";
import { db } from "../database/database.connection.js"
import { v4 as uuid } from 'uuid';
import bcrypt from "bcrypt";


//POST CADASTRO
export async function postSignUp(req, res) {
    const UserData = req.body;

    const encryptedPassword = bcrypt.hashSync(UserData.password, 10);
    const registeredUser = await db.collection("users").findOne({ email: UserData.email })
    if (registeredUser) {
        res.status(409).send("Usúario já existe")
    }

    try {
        await db.collection("users").insertOne({
            name: UserData.name,
            email: UserData.email,
            password: encryptedPassword,
            image: UserData.image
        })
        return res.status(201).send("Usuário cadastrado com sucesso!")
    } catch (err) {
        return response.status(422).send(err.message)
    }
}

//POST LOGIN

export async function postLogin(req, res) {
    const token = uuid()
    const loginData = req.body
    const registeredUser = await db.collection("users").findOne({ email: loginData.email })
    console.log(registeredUser)

    try {
        if (!registeredUser || !bcrypt.compareSync(loginData.password, registeredUser.password)) {
            return response.status(409).send("usuário não cadastrado ou senha incorreta");
        }
        else {
            await db.collection("sessions").insertOne({ userId: registeredUser.email, token: token })
            console.log(token)
            return res.status(200).send(token)
        }

    } catch (err) {
        res.status(500).send(err);
    }
}

//GET PERFIL
export async function getPurchasesMadePage(req, res) {
    const token = req.headers.user
    try {
        const registeredUser = await db.collection("users").findOne( token.userId )
        console.log(registeredUser)
        res.status(200).send(registeredUser)
    } catch (err) {
        console.log(err.message)
    }
}

//POST LOGOUT
export async function postLogout(req, res) {
    const token = res.locals.session.token
    try {
        await db.collection("sessions").deleteOne({ token })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}