const { Router } = require("express");
const sellerController = require("../controllers/sellerControllers");
const sellerRouter = Router();

sellerRouter.get("/", sellerController.getSellers);
sellerRouter.get("/create", sellerController.getCreateSeller);
sellerRouter.post("/create", sellerController.postCreateSeller);
sellerRouter.get("/:id", sellerController.getSellerWith);

module.exports = sellerRouter;
