const { Router } = require("express");
const categoryController = require("../controllers/categoryControllers");
const categoryRouter = Router();

categoryRouter.get("/create", categoryController.getCreateCategory);
categoryRouter.post("/create", categoryController.postCreateCategory);

categoryRouter.get("/:id/delete", categoryController.getDeleteCategory);
categoryRouter.post("/:id/delete", categoryController.postDeleteCategory);

categoryRouter.get("/:id/update", categoryController.getUpdateCategory);
categoryRouter.post("/:id/update", categoryController.postUpdateCategory);

categoryRouter.get("/:id", categoryController.getCategoryProducts);
categoryRouter.get("/", categoryController.getCategories);

module.exports = categoryRouter;
