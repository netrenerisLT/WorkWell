import express from "express";
import db from "../database/connect.js";
import { ordersValidator } from "../middleware/validate.js";

const Router = express.Router();

//Only admin can access
Router.get("/", async (req, res) => {
  try {
    const orders = await db.Orders.findAll();
    res.send(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of orders.");
  }
});

//User can access
Router.get("/user/", async (req, res) => {
  const user_id = 1;
  try {
    const orders = await db.Orders.findAll({
      where: { userId: user_id },
    });
    res.send(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of orders.");
  }
});

Router.post("/new", ordersValidator, async (req, res) => {
  try {
    await db.Orders.create(req.body);
    res.send("New order added.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with creating the order. Please try again.");
  }
});

Router.put("/edit/:id", ordersValidator, async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id);
    await order.update(req.body);
    res.send("Order updated.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with updating the order. Please try again.");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id);
    await order.destroy();
    res.send("Order deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a problem with deleting the order.");
  }
});

export default Router;
