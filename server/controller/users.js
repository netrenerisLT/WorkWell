import express from "express";
import bcrypt from "bcrypt";
import db from "../database/connect.js";
import { registerValidator, loginValidator } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const Router = express.Router();

Router.post("/register", registerValidator, async (req, res) => {
  try {
    const userExists = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      res.status(401).send("User already exist.");
      return;
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await db.Users.create(req.body);
    res.send("User created.");
  } catch (error) {
    console.log(error);
    res.status(418).send("Server error.");
  }
});

Router.post("/login", loginValidator, async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(401).send("User doesn't exist");

    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.loggedin = true;
      req.session.user = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      };
      res.json({
        message: "You successfully logged in.",
        user: req.session.user,
      });
    } else {
      res.status(401).send("Login failed");
    }
  } catch (error) {
    console.log(error);
    res.status(418).send("Server error.");
  }
});

Router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send(
    "You have successfully logged out, we will be waiting for you when you come back :)"
  );
});

Router.get("/check-auth", auth, async (req, res) => {
  res.json(req.session.user);
});

export default Router;
