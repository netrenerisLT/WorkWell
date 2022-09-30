import express from "express";
import Sequelize from "sequelize";
import db from "../database/connect.js";
import upload from "../middleware/multer.js";
import { workersValidator } from "../middleware/validate.js";
import { adminAuth } from "../middleware/auth.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  const options = {
    include: [
      {
        model: db.Suppliers,
        attributes: ["name"],
      },
      {
        model: db.Ratings,
        attributes: {
          exclude: [
            "id",
            "rating",
            "userId",
            "workerId",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
    attributes: {
      include: [
        [Sequelize.fn("AVG", Sequelize.col("ratings.rating")), "total_rating"],
      ],
    },
    group: ["id"],
  };

  if (req.query.supplier)
    options.where = {
      supplierId: req.query.supplier,
    };

  if (req.query.sort)
    options.order = [
      [
        Sequelize.literal("total_rating"),
        req.query.sort === "1" ? "ASC" : "DESC",
      ],
    ];
  try {
    const workers = await db.Workers.findAll(options);
    res.send(workers);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with showing the list of worker.");
  }
});

Router.get("/single/:id", adminAuth, async (req, res) => {
  try {
    const worker = await db.Workers.findByPk(req.params.id, {
      attributes: ["first_name", "last_name", "photo", "supplierId"],
    });
    res.json(worker);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("There was a problem with creating the service. Please try again.");
  }
});

Router.post(
  "/new",
  upload.single("photo"),
  adminAuth,
  workersValidator,
  async (req, res) => {
    try {
      if (req.file) req.body.photo = req.file.path;
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
  adminAuth,
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

Router.delete("/delete/:id", adminAuth, async (req, res) => {
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
