// add middlewares here related to actions
const Actions = require("./actions-model");

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

module.exports = {
  validateAction,
};
