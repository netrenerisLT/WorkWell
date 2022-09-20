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

  database.Suppliers.hasOne(database.Workers);
  database.Workers.belongsTo(database.Suppliers);

  //Services belongsTo suppliers
  database.Suppliers.hasMany(database.Services);
  database.Services.belongsTo(database.Suppliers);

  database.Users.hasMany(database.Orders);
  database.Orders.belongsTo(database.Users);

  database.Services.hasOne(database.Orders);
  database.Orders.belongsTo(database.Services);

  database.Users.hasOne(database.Ratings);
  database.Ratings.belongsTo(database.Users);

  database.Workers.hasMany(database.Ratings);
  database.Ratings.belongsTo(database.Workers);

  await sequelize.sync({ alter: false });
} catch (error) {
  console.log(error);
  console.log("Nepavyko prisijungti prie duomenų bazės");
}

export default database;
