// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Projects = require("./projects-model");

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

module.exports = router;
