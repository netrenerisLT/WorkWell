import express from "express";
import cors from "cors";
import session from "express-session";
import {
  Users,
  Services,
  Suppliers,
  Workers,
  Orders,
  Ratings,
} from "./controller/index.js";

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

//Kontroleriu priskyrimas
app.use("/api/suppliers/", Suppliers);
app.use("/api/services/", Services);
app.use("/api/users/", Users);
app.use("/api/workers/", Workers);
app.use("/api/orders/", Orders);
app.use("/api/ratings/", Ratings);

//Paleidžiame serverį
app.listen(3000);
