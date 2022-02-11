// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function validateAction(req, res, next) {
  const { id } = req.params;
  try {
    const existingAction = await Actions.get(id);
    if (!existingAction) {
      next({ status: 404, message: `action not found` });
    } else {
      req.action = existingAction;
      next();
    }
  } catch (err) {
    next(err);
  }
}

// needed to pull in Projects model to validate that the project id is associated with an existing project
async function validateProject(req, res, next) {
  const { project_id } = req.body;
  try {
    const existingProject = await Projects.get(project_id);
    if (!existingProject) {
      next({ status: 404, message: `project not found` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateActionPayload(req, res, next) {
  const { notes, description, project_id } = req.body;

  try {
    if (notes && description && project_id) {
      next();
    } else {
      next({ status: 400, message: "missing required field" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateAction,
  validateActionPayload,
  validateProject,
};
