const { Router } = require("express");
const categoryController = require("../controllers/categoryControllers");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/create", categoryController.getCreateCategory);
categoryRouter.post("/create", categoryController.postCreateCategory);
categoryRouter.get("/:id", categoryController.getCategoriesWith);

module.exports = categoryRouter;
