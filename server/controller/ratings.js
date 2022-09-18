import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";

const Router = express.Router();

Router.post("/worker/:id", ratingsValidator, async (req, res) => {
  req.body.workerId = req.params.id; //from url automatically set workerId in db
  try {
    await db.Ratings.create(req.body);
    res.send("New review added.");
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a problem with adding review.");
  }
});

export default Router;
