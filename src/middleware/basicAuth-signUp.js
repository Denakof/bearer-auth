"use strict";

module.exports = (users) => async (req, res, next) => {
  if (!req.headers.authorization) {
    console.error(`No authorization header found - jwt`);
    next("Invalid login no header");
    return;
  }

  // Basic lkahsdfklhsdf
  // Bearer lksahdflkjhdsaflkhasdlkfhj

  let token = req.headers.authorization.split(" ").pop();

  try {
    let u = await users.authenticateBearer(token);
  } catch (error) {
    res.json(error);
  }
  next();
};
