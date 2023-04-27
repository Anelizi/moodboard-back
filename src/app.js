import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//criar o env DATABASE_URL=mongodb://localhost:27017/moodboard

//Cadastro e Login















































// Home e User


























































//Cart e Product

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
