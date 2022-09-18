import express from "express";
import db from "../database/connect.js";
import upload from "../middleware/multer.js";
import { workersValidator } from "../middleware/validate.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const workers = await db.Workers.findAll();
    res.send(workers);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of worker.");
  }
});

Router.post(
  "/new",
  upload.single("photo"),
  workersValidator,
  async (req, res) => {
    try {
      req.body.photo = req.file.path;
      await db.Workers.create(req.body);
      res.send("New worker added.");
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send(
          "There was a problem with creating the worker. Please try again."
        );
    }
  }
);

Router.put(
  "/edit/:id",
  upload.single("photo"),
  workersValidator,
  async (req, res) => {
    try {
      if (req.file) req.body.photo = "/uploads/" + req.file.filename;
      const worker = await db.Workers.findByPk(req.params.id);
      await worker.update(req.body);
      res.send("Worker updated.");
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send(
          "There was a problem with updating the worker. Please try again."
        );
    }
  }
);

Router.delete("/delete/:id", async (req, res) => {
  try {
    const worker = await db.Workers.findByPk(req.params.id);
    await worker.destroy();
    res.send("Worker deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a problem with deleting the worker.");
  }
});

export default Router;
