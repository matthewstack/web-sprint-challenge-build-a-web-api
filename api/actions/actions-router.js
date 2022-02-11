// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");

router.get("/", async (req, res, next) => {
  try {
    const theActions = await Actions.get();
    res.json(theActions);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the actions router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
