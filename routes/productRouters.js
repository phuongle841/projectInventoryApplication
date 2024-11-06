const { Router } = require("express");
const productController = require("../controllers/productControllers");
const productRouter = Router();

productRouter.get("/", productController.getProducts);
productRouter.post("/create", productController.postCreateProduct);
productRouter.get("/create", productController.getCreateProduct);

productRouter.post("/:id/update", productController.postUpdateProduct);
productRouter.get("/:id/update", productController.getUpdateProduct);
productRouter.get("/:id", productController.getProductWith);

module.exports = productRouter;
