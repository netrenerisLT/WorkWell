import express from "express";
import db from "../database/connect.js";
import { ordersValidator } from "../middleware/validate.js";
import { auth, adminAuth } from "../middleware/auth.js";

const Router = express.Router();

//Only admin can access
Router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await db.Orders.findAll({
      include: [
        { model: db.Users, attributes: ["first_name", "last_name"] },
        {
          model: db.Services,
          attributes: {
            exclude: ["duration", "price", "id", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.send(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of orders.");
  }
});

//User can access
Router.get("/user/", auth, async (req, res) => {
  const user_id = req.session.user.id;
  try {
    const orders = await db.Orders.findAll({
      where: { userId: user_id },
      include: [
        {
          model: db.Services,
          attributes: ["name", "duration", "price"],
          include: {
            model: db.Suppliers,
            attributes: ["name", "address", "phone_number", "email"],
          },
        },
        {
          model: db.Workers,
          attributes: ["first_name", "last_name"],
        },
        {
          model: db.Ratings,
          attributes: ["rating"],
        },
      ],
      group: ["id"],
    });
    res.send(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of orders.");
  }
});

Router.get("/single/:id", adminAuth, async (req, res) => {
  try {
    const service = await db.Orders.findByPk(req.params.id, {
      attributes: ["order_date", "status", "serviceId", "workerId"],
    });
    res.json(service);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with creating the service. Please try again.");
  }
});

Router.post("/new", auth, ordersValidator, async (req, res) => {
  try {
    req.body.userId = req.session.user.id;
    await db.Orders.create(req.body);
    res.send("New order added.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with creating the order. Please try again.");
  }
});

Router.put("/edit/:id", adminAuth, ordersValidator, async (req, res) => {
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

Router.delete("/delete/:id", auth || adminAuth, async (req, res) => {
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
