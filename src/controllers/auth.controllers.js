import { db } from "../app.js";
import { v4 as uuid } from 'uuid';
import bcrypt from "bcrypt";


//POST CADASTRO
export async function postSignUp(req, res) {
    const UserData = req.body;

    const encryptedPassword = bcrypt.hashSync(UserData.password, 10);
    const registeredUser = await db.collection("users").findOne({ email: UserData.email })
    if (registeredUser) {
        return response.status(409).send("Usúario já existe")
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

export async function postLogin(req, res){
    const token = uuid()
    const loginData = req.body
    const registeredUser = await db.collection("users").findOne({ email: UserData.email })
    try {
        if (!registeredUser || !bcrypt.compareSync(loginData.password, registeredUser.password)) {
            return response.status(409).send("usuário não cadastrado ou senha incorreta");
        }
        res.status(500).send(err);

    } catch (err) {
        res.status(200).send({ token: token });
    }
}