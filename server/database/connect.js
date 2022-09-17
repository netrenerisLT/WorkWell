import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import {
  Users,
  Workers,
  Suppliers,
  Services,
  Ratings,
  Orders,
} from "../model/index.js";

const database = {};
const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "WorkWell",
};

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  });

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS " + credentials.database
  );

  const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    { dialect: "mysql" }
  );

  database.Users = Users(sequelize);
  database.Workers = Workers(sequelize);
  database.Suppliers = Suppliers(sequelize);
  database.Services = Services(sequelize);
  database.Ratings = Ratings(sequelize);
  database.Orders = Orders(sequelize);

  await sequelize.sync({ alter: false });
} catch (error) {
  console.log(error);
  console.log("Nepavyko prisijungti prie duomenų bazės");
}

export default database;
