import express from "express";
import db from "../database/connect.js";
import { suppliersValidator } from "../middleware/validate.js";

const Router = express.Router();
Router.get("/", async (req, res) => {
  try {
    const suppliers = await db.Suppliers.findAll();
    res.send(suppliers);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of suppliers.");
  }
});

Router.post("/new", suppliersValidator, async (req, res) => {
  try {
    await db.Suppliers.create(req.body);
    res.send("New supplier created.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        "There was a problem with creating the supplier. Please try again."
      );
  }
});

Router.put("/edit/:id", suppliersValidator, async (req, res) => {
  try {
    const supplier = await db.Suppliers.findByPk(req.params.id);
    await supplier.update(req.body);
    res.send("Supplier updated.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        "There was a problem with updating the supplier. Please try again."
      );
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const supplier = await db.Suppliers.findByPk(req.params.id);
    await supplier.destroy();
    res.send("Supplier deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a problem with deleting the supplier.");
  }
});

export default Router;
