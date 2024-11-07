const { Router } = require("express");
const productController = require("../controllers/productControllers");
const productRouter = Router();

productRouter.post("/create", productController.postCreateProduct);
productRouter.get("/create", productController.getCreateProduct);

productRouter.post("/:id/delete", productController.postDeleteProduct);
productRouter.get("/:id/delete", productController.getDeleteProduct);

productRouter.post("/:id/update", productController.postUpdateProduct);
productRouter.get("/:id/update", productController.getUpdateProduct);

productRouter.get("/:id", productController.getProductWith);
productRouter.get("/", productController.getProducts);

module.exports = productRouter;
