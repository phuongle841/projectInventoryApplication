const { Router } = require("express");
const sellerController = require("../controllers/sellerControllers");
const sellerRouter = Router();

sellerRouter.get("/create", sellerController.getCreateSeller);
sellerRouter.post("/create", sellerController.postCreateSeller);

sellerRouter.get("/:id/delete", sellerController.getDeleteSeller);
sellerRouter.post("/:id/delete", sellerController.postDeleteSeller);

sellerRouter.get("/:id/update", sellerController.getUpdateSeller);
sellerRouter.post("/:id/update", sellerController.postUpdateSeller);

sellerRouter.get("/:id", sellerController.getSellerProducts);
sellerRouter.get("/", sellerController.getSellers);

module.exports = sellerRouter;
