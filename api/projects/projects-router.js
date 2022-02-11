// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Projects = require("./projects-model");

const {
  validateProject,
  validateProjectPayload,
} = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const theProjects = await Projects.get();
    res.json(theProjects);
  } catch (err) {
    res.status(500).json({
      message: "An error has happened",
    });
  }
});

router.get("/:id", validateProject, (req, res, next) => {
  res.json(req.project);
});

router.post("/", validateProjectPayload, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      next(err);
    });
});

router.put(
  "/:id",
  validateProjectPayload,
  validateProject,
  (req, res, next) => {
    Projects.update(req.params.id, req.body)

      .then((project) => {
        res.json(project);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.delete("/:id", validateProject, (req, res, next) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(() => {
      return res.json(req.project);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/actions", validateProject, (req, res, next) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((actions) => {
      res.json(actions);
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
