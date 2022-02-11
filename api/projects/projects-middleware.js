// add middlewares here related to projects
const Projects = require("./projects-model");

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}

async function validateProject(req, res, next) {
  const { id } = req.params;
  try {
    const existingProject = await Projects.get(id);
    if (!existingProject) {
      next({ status: 404, message: `project not found` });
    } else {
      req.project = existingProject;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateProjectPayload(req, res, next) {
  const { name, description, completed } = req.body;

  //   can't use !completed because the field would be blank, not false
  if (name && description && (completed === false || completed === true)) {
    next();
  } else {
    next({ status: 400, message: "missing required field" });
  }
}

module.exports = {
  logger,
  validateProject,
  validateProjectPayload,
};
