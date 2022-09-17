import express from "express";
import cors from "cors";
import session from "express-session";
import database from "./database/connect.js";

const app = express();

//CORS blokavimo nuėmimas
app.use(cors());

//Duomenų priėmimui JSON formatu
app.use(express.json());

//Failu perdavimui is statinės direktorijos
app.use("/uploads", express.static("uploads"));

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: "VerySecretPhraseForWeb20221231",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 6000000,
    },
  })
);

//Paleidžiame serverį
app.listen(3000);
