const { Router } = require("express");
const sellerController = require("../controllers/sellerControllers");
const sellerRouter = Router();

sellerRouter.get("/", sellerController.getSellers);
sellerRouter.get("/:id", sellerController.getSellerWith);

module.exports = sellerRouter;
