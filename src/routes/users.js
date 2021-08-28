"use strict";

const express = require("express");
const router = express.Router();
const { Users } = require("../models/index");
const bccrypt = require("bcrypt");
const base64 = require("base-64");
const basicAuth = require("../middleware/basicAuth-signIn");
const bearerAuth = require("../middleware/basicAuth-signUp");

// router.get('/users', getAll);
// router.post('/users', create);

// async function getAll(req, res) {
//   let user1 = await Users.getAll();
//   res.status(200).json(user1);
// }

// async function create(req, res) {
//   let user = req.body;

//   let user1 = await Users.create(user);
//   res.status(201).json(user1);
// }

router.post("/signup", async (req, res) => {
  // check if user name exists
  console.log(req.body);
  let u = await Users.create(req.body);
  res.status(201).send(u);
});

router.post("/signin", basicAuth(Users), (req, res) => {
  res.status(200).send(req.user);
});
router.get("/secret", bearerAuth(Users), (req, res) => {
  res.status(200).json("this is so secret");
});
module.exports = router;
