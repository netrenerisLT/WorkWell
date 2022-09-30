import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const Router = express.Router();

Router.post(
  "/worker/:wid/order/:oid",
  auth,
  ratingsValidator,
  async (req, res) => {
    const userId = req.session.user.id;

    req.body.workerId = req.params.wid; //from url automatically set workerId in db
    req.body.orderId = req.params.oid;
    req.body.userId = userId;

    try {
      await db.Ratings.create(req.body);
      res.send("New review added.");
    } catch (error) {
      console.log(error);
      res.status(500).send("There was a problem with adding review.");
    }
  }
);

export default Router;
