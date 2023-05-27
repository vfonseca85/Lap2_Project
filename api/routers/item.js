const { Router } = require('express');

const itemController = require('../controllers/item');

const itemRouter = Router();

itemRouter.get("/", itemController.index);
itemRouter.post("/", itemController.create);
itemRouter.get("/:id", itemController.show);
itemRouter.patch("/:id", itemController.update);
itemRouter.delete("/:id", itemController.destroy);

module.exports = itemRouter;
