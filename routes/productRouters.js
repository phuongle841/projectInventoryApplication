const { Router } = require("express");
const productController = require("../controllers/productControllers");
const productRouter = Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductWith);

module.exports = productRouter;
