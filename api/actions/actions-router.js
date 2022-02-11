// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");

const {
  validateAction,
  validateActionPayload,
  validateProject,
} = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const theActions = await Actions.get();
    res.json(theActions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateAction, (req, res, next) => {
  res.json(req.action);
});

router.post("/", validateActionPayload, validateProject, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateAction, validateActionPayload, (req, res, next) => {
  Actions.update(req.params.id, req.body)

    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", validateAction, (req, res, next) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(() => {
      return res.json(req.action);
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the actions router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
