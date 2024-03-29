"use strict";

// const POSTGRES_URI = process.env.POSTGRES_URI || 'postgres://localhost/postgres';
const POSTGRES_URI =
  process.env.POSTGRES_URI ||
  "postgres://qabauxrd:xiMN8Jlf2zhbmVraUNIymntOqofG_ywk@tai.db.elephantsql.com/qabauxrd";
const { Sequelize, DataTypes } = require("sequelize");
const Users = require("./users");
const Collection = require("./collection-class");
const bcrypt = require("bcrypt");
var sequelize = new Sequelize(POSTGRES_URI, {});
const SECRET = process.env.JWT_SECRET || "super-secret";

const usersModel = Users(sequelize, DataTypes);
const jwt = require("jsonwebtoken");
usersModel.beforeCreate(async (user) => {
  let hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});

usersModel.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ where: { username } });
  // we need to check if null.

  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    return user;
  }

  throw new Error("Invalid user");
};

usersModel.authenticateBearer = async function (token) {
  console.log(token);
  console.log(jwt.decode(token));

  const verifiedToken = jwt.verify(token, SECRET);

  //if not verfiied you need to throw an error
  const user = await this.findOne({
    where: { username: verifiedToken.username },
  });

  if (user) {
    return user;
  }
  throw new Error("Invalid user");
};

module.exports = {
  db: sequelize,
  Users: usersModel,
};
