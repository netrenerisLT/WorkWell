import express from "express";
import db from "../database/connect.js";
import { servicesValidator } from "../middleware/validate.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  const options = {
    //we fetch additional data
    include: {
      model: db.Suppliers,
      attributes: ["name"],
    },
  };

  if (req.query.supplier) {
    options.where = {
      supplierId: req.query.supplier,
    };
  }

  try {
    const services = await db.Services.findAll(options);
    res.send(services);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of services.");
  }
});

Router.get("/single/:id", async (req, res) => {
  try {
    const service = await db.Services.findByPk(req.params.id, {
      attributes: ["name", "duration", "price", "supplierId"],
    });
    res.json(service);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with creating the service. Please try again.");
  }
});

Router.post("/new", servicesValidator, async (req, res) => {
  try {
    await db.Services.create(req.body);
    res.send("New service added.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with creating the service. Please try again.");
  }
});

Router.put("/edit/:id", servicesValidator, async (req, res) => {
  try {
    const service = await db.Services.findByPk(req.params.id);
    await service.update(req.body);
    res.send("Service updated.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with updating the service. Please try again.");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const service = await db.Services.findByPk(req.params.id);
    await service.destroy();
    res.send("Service deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a problem with deleting the service.");
  }
});

export default Router;
